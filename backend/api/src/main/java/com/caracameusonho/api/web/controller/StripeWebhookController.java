package com.caracameusonho.api.web.controller;

import com.caracameusonho.api.domain.model.PacoteViagem;
import com.caracameusonho.api.domain.model.Reserva;
import com.caracameusonho.api.domain.model.Usuario;
import com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import com.caracameusonho.api.domain.repository.ReservaRepository;
import com.caracameusonho.api.domain.repository.UsuarioRepository;
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
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/stripe/webhook")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PacoteViagemRepository pacoteViagemRepository; 
    @Autowired
    private UsuarioRepository usuarioRepository;     


  @PostMapping
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {

        if (sigHeader == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing Stripe-Signature header");
        }

        Event event;
        try {
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

                    Long pacoteId = Long.parseLong(session.getMetadata().get("pacote_viagem_id"));
                    Long usuarioId = Long.parseLong(session.getMetadata().get("usuario_id"));
                    
                    Optional<PacoteViagem> optionalPacote = pacoteViagemRepository.findById(pacoteId);
                    Optional<Usuario> optionalUsuario = usuarioRepository.findById(usuarioId);

                    if (optionalPacote.isPresent() && optionalUsuario.isPresent()) {
                        Reserva novaReserva = new Reserva();
                        novaReserva.setStatus("PAGO"); 
                        novaReserva.setStripeSessionId(session.getId());
                        novaReserva.setPacoteViagem(optionalPacote.get());
                        novaReserva.setUsuario(optionalUsuario.get());
                        novaReserva.setValorTotal(session.getAmountTotal().doubleValue() / 100);
                        novaReserva.setDataReserva(LocalDate.now());

                        reservaRepository.save(novaReserva);
                        System.out.println("✅ Nova reserva salva no banco de dados com ID: " + novaReserva.getId());
                    } else {
                        System.out.println("❌ Erro: Usuário ou Pacote de Viagem não encontrados para a reserva.");
                    }
                }
                break;
            default:
                System.out.println("🔔 Evento não processado (informativo): " + event.getType());
        }

        return ResponseEntity.ok("Received");
    }
}
