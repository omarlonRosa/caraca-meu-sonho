package br.com.caracameusonho.api.application.controller.auth;

import br.com.caracameusonho.api.application.dto.GoogleLoginDTO;
import br.com.caracameusonho.api.application.dto.LoginResponseDTO;
import br.com.caracameusonho.api.domain.service.OAuth2Service;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class OAuth2Controller {

    private final OAuth2Service oAuth2Service;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginDTO googleLoginDTO) {
        System.out.println(">>> CONTROLLER: RECEBIDA REQUISIÇÃO GOOGLE <<<");
        try {
            String token = oAuth2Service.processGoogleLogin(googleLoginDTO.code(), googleLoginDTO.redirectUri());
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro no Backend: " + e.getMessage());
        }
    }
}
