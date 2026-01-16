package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuth2Service {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    private final UsuarioRepository usuarioRepository;
    private final TokenService tokenService;

    @Transactional
    public String processGoogleLogin(String code, String redirectUri) {
        try {
            GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    new GsonFactory(),
                    "https://oauth2.googleapis.com/token",
                    clientId,
                    clientSecret,
                    code,
                    redirectUri
            ).setRequestInitializer(request -> {
            }).execute();

            GoogleIdToken idToken = tokenResponse.parseIdToken();
            GoogleIdToken.Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            String nome = (String) payload.get("name");
            String fotoUrl = (String) payload.get("picture");

            Usuario usuario = usuarioRepository.findByEmail(email).orElseGet(() -> {
                Usuario novo = new Usuario();
                novo.setNome(nome);
                novo.setEmail(email);
                novo.setFotoPerfilUrl(fotoUrl);
                novo.setRoles("ROLE_USER");
                novo.setSenha(UUID.randomUUID().toString());
                return usuarioRepository.save(novo);
            });

            return tokenService.generateToken(usuario);

        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar login Google: " + e.getMessage(), e);
        }
    }
}
