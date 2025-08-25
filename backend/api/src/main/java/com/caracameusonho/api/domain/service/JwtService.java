package com.caracameusonho.api.domain.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Service
public class JwtService {

  private final long EXPERATION_TIME_MS = 8 * 60 * 60 * 1000;

  @Value("${app.jwt.secret}")
  private String jwtSecret;

  public String generateToken(Authentication authentication) {
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + EXPERATION_TIME_MS);

    SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

    return Jwts.builder()
              .setSubject(userDetails.getUsername())
              .setIssuedAt(now)
              .setExpiration(expiryDate)
              .signWith(key, SignatureAlgorithm.HS256)
              .compact();
  }

  public String validateToken(String token) {
    try {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    } catch (Exception e) {
        return "";
    }
}
}
