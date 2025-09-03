package com.caracameusonho.api.web.controller;

import com.caracameusonho.api.domain.service.ListaEsperaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lista-espera")
public class ListaEsperaController {

    @Autowired
    private ListaEsperaService listaEsperaService;

    @PostMapping("/inscrever/{pacoteId}")
    public ResponseEntity<String> inscreverNaLista(
            @PathVariable Long pacoteId,
            Authentication authentication) {

        String email = "";
        if (authentication.getPrincipal() instanceof UserDetails) {
            email = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.core.user.OAuth2User) {
            email = ((org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }

        if (email.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuário não autenticado.");
        }

        if (listaEsperaService.inscreverNaListaEspera(email, pacoteId).isPresent()) {
            return ResponseEntity.ok("Inscrição na lista de espera realizada com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Falha ao se inscrever na lista de espera. Talvez você já esteja inscrito.");
        }
    }
}
