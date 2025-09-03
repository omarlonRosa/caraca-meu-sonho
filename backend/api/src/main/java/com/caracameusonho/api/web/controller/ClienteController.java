package com.caracameusonho.api.web.controller;

import com.caracameusonho.api.domain.model.DocumentoViagem;
import com.caracameusonho.api.domain.model.FotoViagem;
import com.caracameusonho.api.domain.model.Reserva;
import com.caracameusonho.api.domain.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/reservas")
    public ResponseEntity<List<Reserva>> getReservas(Authentication authentication) {
        String email = "";

        if (authentication.getPrincipal() instanceof UserDetails) {
            email = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.core.user.OAuth2User) {
            email = ((org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }
        
        if (email.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<Reserva> reservas = clienteService.buscarReservasDoUsuario(email);
        return ResponseEntity.ok(reservas);
    }


  @GetMapping("/reservas/{id}/documentos")
    public ResponseEntity<List<DocumentoViagem>> getDocumentosDaReserva(
            @PathVariable Long id,
            Authentication authentication) {
        
        String email = "";
        if (authentication.getPrincipal() instanceof UserDetails) {
            email = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.core.user.OAuth2User) {
            email = ((org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }

        if (email.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
     
        List<DocumentoViagem> documentos = clienteService.buscarDocumentosDaReserva(id);
        return ResponseEntity.ok(documentos);
    }


  @GetMapping("/reservas/{id}/fotos")
    public ResponseEntity<List<FotoViagem>> getFotosDaReserva(
            @PathVariable Long id,
            Authentication authentication) {
        
        String email = "";
        if (authentication.getPrincipal() instanceof UserDetails) {
            email = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.core.user.OAuth2User) {
            email = ((org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }

        if (email.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<FotoViagem> fotos = clienteService.buscarFotosDaReserva(id);
        return ResponseEntity.ok(fotos);
    }
}
