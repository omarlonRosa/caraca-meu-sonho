package com.caracameusonho.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.caracameusonho.api.domain.service.JwtService;
import com.caracameusonho.api.domain.service.OAuth2AuthenticationService;

import java.util.List;
import java.util.UUID;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private SecurityFilter securityFilter;

  @Autowired
  private OAuth2AuthenticationService oAuth2AuthenticationService;

  @Autowired
  private JwtService jwtService;


  @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authorize -> authorize 
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/register").permitAll()
                .requestMatchers(HttpMethod.GET, "/oauth2/authorization/google").permitAll()
                .requestMatchers(HttpMethod.GET, "/login/oauth2/code/google").permitAll()

                .requestMatchers(HttpMethod.GET, "/oauth2/callback/google").permitAll()
                .requestMatchers(HttpMethod.POST, "/checkout/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/stripe/webhook").permitAll()
                .requestMatchers(HttpMethod.GET, "/pacotes/**").permitAll()
                
                .requestMatchers("/admin/**").hasRole("ADMIN")

                .requestMatchers(HttpMethod.GET, "/cliente/**").hasAnyRole("USER", "ADMIN")
              
                .anyRequest().authenticated()
            )
            
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(auth -> auth.baseUri("/oauth2/authorization"))
                .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2AuthenticationService))
                .successHandler(successHandler())
            
    )
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

  @Bean
public AuthenticationSuccessHandler successHandler() {
    return (request, response, authentication) -> {
        String username;
        // Verifica se o objeto de autenticação é um OAuth2User (login do Google)
        if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.core.user.OAuth2User) {
            org.springframework.security.oauth2.core.user.OAuth2User oauth2User =
                (org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal();
            username = oauth2User.getAttribute("email");
        } else {
            // Se não for, assume que é um UserDetails (login tradicional)
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            username = userDetails.getUsername();
        }

        // Gera o token usando o novo método
        String token = jwtService.generateToken(username);

        // Redireciona para o frontend com o token na URL
        response.sendRedirect("http://localhost:5173/oauth2/callback?token=" + token);
    };

     }


  
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
