package com.caracameusonho.api.config;

import com.caracameusonho.api.domain.service.AuthenticationService;
import com.caracameusonho.api.domain.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        var token = this.recoverToken(request);

        if (token != null) {
            // A LÓGICA DE VALIDAÇÃO AGORA ESTÁ DENTRO DE UM TRY-CATCH
            try {
                var subject = jwtService.validateToken(token);
                if (subject != null && !subject.isEmpty()) {
                    UserDetails user = authenticationService.loadUserByUsername(subject);
                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    // Define o usuário como autenticado para esta requisição
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                // Se o token for inválido por qualquer motivo (expirado, assinatura errada, etc.),
                // nós simplesmente limpamos o contexto e deixamos a requisição prosseguir como anônima.
                SecurityContextHolder.clearContext();
            }
        }
        
        // Continua para os próximos filtros da cadeia
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
