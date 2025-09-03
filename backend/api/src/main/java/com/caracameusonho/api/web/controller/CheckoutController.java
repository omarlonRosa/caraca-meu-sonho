package com.caracameusonho.api.web.controller;

import com.caracameusonho.api.domain.model.Usuario;
import com.caracameusonho.api.domain.repository.UsuarioRepository;
import com.caracameusonho.api.domain.service.StripeCheckoutService;
import com.caracameusonho.api.web.dto.CheckoutRequestDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/checkout")
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.POST, RequestMethod.OPTIONS })
public class CheckoutController {

    @Autowired
    private StripeCheckoutService checkoutService;

  @Autowired
    private UsuarioRepository usuarioRepository;

   @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(
            @RequestBody CheckoutRequestDTO request,
            Authentication authentication) throws StripeException {
        
        String email = "";
        if (authentication.getPrincipal() instanceof UserDetails) {
            email = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.core.user.OAuth2User) {
            email = ((org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal()).getAttribute("email");
        } else {
             return ResponseEntity.badRequest().body(Map.of("error", "Usuário não autenticado"));
        }

        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);

        if (optionalUsuario.isEmpty()) {
             return ResponseEntity.badRequest().body(Map.of("error", "Usuário não encontrado no banco de dados."));
        }

        Session session = checkoutService.createCheckoutSession(request.pacoteId(), optionalUsuario.get().getId());
        return ResponseEntity.ok(Map.of("sessionId", session.getId()));
    }

     }
