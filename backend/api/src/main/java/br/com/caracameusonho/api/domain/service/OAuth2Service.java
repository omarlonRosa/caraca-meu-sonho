package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuth2Service {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    public String processGoogleLogin(String code) {
        String accessToken = getGoogleAccessToken(code);

        JsonNode userInfo = getGoogleUserInfo(accessToken);
        String userEmail = userInfo.get("email").asText();
        String userName = userInfo.get("name").asText();

        Usuario usuario = findOrCreateUser(userEmail, userName);

        return tokenService.generateToken(usuario);
    }

    private String getGoogleAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("code", code);
        map.add("client_id", googleClientId);
        map.add("client_secret", googleClientSecret);
        map.add("redirect_uri", googleRedirectUri);
        map.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        ResponseEntity<JsonNode> response = restTemplate.postForEntity("https://oauth2.googleapis.com/token", request, JsonNode.class);

        return Objects.requireNonNull(response.getBody()).get("access_token").asText();
    }

    private JsonNode getGoogleUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<JsonNode> response = restTemplate.exchange("https://www.googleapis.com/oauth2/v2/userinfo", HttpMethod.GET, entity, JsonNode.class);
        return response.getBody();
    }

private Usuario findOrCreateUser(String email, String name) {
    return usuarioRepository.findByEmail(email).orElseGet(() -> {
        Usuario newUser = new Usuario();
        newUser.setEmail(email);
        newUser.setNome(name);
        newUser.setSenha(passwordEncoder.encode(UUID.randomUUID().toString()));
        newUser.setRoles("ROLE_USER");
        return usuarioRepository.save(newUser);
    });
}
}
