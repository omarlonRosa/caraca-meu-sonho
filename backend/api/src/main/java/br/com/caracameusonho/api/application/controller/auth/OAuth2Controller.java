package br.com.caracameusonho.api.application.controller.auth;

import br.com.caracameusonho.api.application.dto.GoogleLoginDTO;
import br.com.caracameusonho.api.application.dto.LoginResponseDTO;
import br.com.caracameusonho.api.domain.service.OAuth2Service;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class OAuth2Controller {

    private final OAuth2Service oAuth2Service;

	@PostMapping("/google")
    public ResponseEntity<LoginResponseDTO> googleLogin(@RequestBody GoogleLoginDTO googleLoginDTO) {
        try {
            String token = oAuth2Service.processGoogleLogin(googleLoginDTO.code(), googleLoginDTO.redirectUri());
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


   }
