package com.caracameusonho.api.web.controller;

import com.caracameusonho.api.domain.model.Reserva;
import com.caracameusonho.api.domain.model.StatusReserva;
import com.caracameusonho.api.domain.repository.ReservaRepository;
import com.google.gson.JsonSyntaxException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.exception.SignatureVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stripe/webhook")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @Autowired
    private ReservaRepository reservaRepository;
    
    // Futuramente, precisaremos do PacoteViagemRepository e do UsuarioRepository aqui

    @PostMapping
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        
        if (sigHeader == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing Stripe-Signature header");
        }

        Event event;
        try {
            // Reativamos a verificação de assinatura, que é crucial para a segurança
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (JsonSyntaxException | SignatureVerificationException e) {
            System.out.println("⚠️ Webhook error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Webhook error: " + e.getMessage());
        }

        switch (event.getType()) {
            case "checkout.session.completed":
                Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
                
                if (session != null) {
                    System.out.println("\n\n\n✅✅✅ PAGAMENTO BEM-SUCEDIDO! Evento 'checkout.session.completed' recebido! ✅✅✅\n\n\n");
                    System.out.println("Session ID: " + session.getId());
                    
                    // LÓGICA FINAL: Salva a reserva no banco de dados
                    // Por enquanto, criaremos uma reserva simples. Depois, associaremos ao pacote e usuário corretos.
                    Reserva novaReserva = new Reserva();
                    novaReserva.setStatus(StatusReserva.PAGO);
                    novaReserva.setStripeSessionId(session.getId());
                    
                    reservaRepository.save(novaReserva);
                    System.out.println("✅ Nova reserva salva no banco de dados com ID: " + novaReserva.getId());
                }
                break;
            default:
                // Não fazemos nada para os outros eventos, pois não são a confirmação final
                System.out.println("🔔 Evento não processado (informativo): " + event.getType());
        }

        return ResponseEntity.ok("Received");
    }
}
