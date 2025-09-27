package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class TokenService {

    @Value("${app.jwt.secret}")
    private String jwtSecret;


	// Em TokenService.java

public String generateToken(Usuario usuario) { // <-- Recebe 'Usuario'
    Instant now = Instant.now();
    Instant expiration = now.plus(8, ChronoUnit.HOURS);

    // Pega as roles DIRETAMENTE do objeto 'usuario'
    String roles = usuario.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

    return Jwts.builder()
            .issuer("CaracaMeuSonho API")
            .subject(usuario.getUsername()) // Usa o 'usuario'
            .claim("roles", roles)
            .issuedAt(Date.from(now))
            .expiration(Date.from(expiration))
            .signWith(getSigningKey())
            .compact();
}


    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
