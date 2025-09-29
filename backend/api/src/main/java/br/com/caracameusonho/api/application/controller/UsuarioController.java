package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/me")
@AllArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/foto-perfil")
    public ResponseEntity<Map<String, String>> uploadFotoPerfil(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal Usuario usuarioLogado) throws IOException {

        String novoToken = usuarioService.alterarFotoPerfil(usuarioLogado, file);

        return ResponseEntity.ok(Map.of("token", novoToken));
    }
}
