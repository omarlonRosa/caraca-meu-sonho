package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.domain.service.ReservaService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.RequestOptions;
import com.stripe.net.Webhook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
public class StripeWebhookController {

    private static final Logger logger = LoggerFactory.getLogger(StripeWebhookController.class);
    private final String webhookSecret;
    private final String stripeSecretKey;
    private final ReservaService reservaService;

    public StripeWebhookController(
            @Value("${stripe.webhook.secret}") String webhookSecret,
            @Value("${stripe.api.secret-key}") String stripeSecretKey,
            ReservaService reservaService
    ) {
        this.webhookSecret = webhookSecret;
        this.stripeSecretKey = stripeSecretKey;
        this.reservaService = reservaService;
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, this.webhookSecret);
        } catch (SignatureVerificationException e) {
            logger.error("⚠️ Falha na verificação da assinatura do Webhook!", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signature verification failed.");
        }

        StripeObject stripeObject = event.getDataObjectDeserializer().getObject().orElse(null);
        String reservaIdStr = null;
        PaymentIntent paymentIntent = null;
        
        RequestOptions requestOptions = RequestOptions.builder()
            .setApiKey(this.stripeSecretKey)
            .build();

        if ("payment_intent.succeeded".equals(event.getType())) {
            if (stripeObject instanceof PaymentIntent) {
                PaymentIntent eventPaymentIntent = (PaymentIntent) stripeObject;
                try {
                    paymentIntent = PaymentIntent.retrieve(eventPaymentIntent.getId(), requestOptions);
                    
                    // --- INÍCIO DA ANÁLISE FORENSE (SINTAXE CORRIGIDA) ---
                    logger.info("----------------- ANÁLISE FORENSE DO PAYMENT_INTENT -----------------");
                    logger.info("ID do PaymentIntent: {}", paymentIntent.getId());
                    String apiKey = Stripe.apiKey; // Acesso correto à variável
                    logger.info("CONFIGURAÇÃO ATUAL DA STRIPE NO MOMENTO DA CHAMADA:");
                    logger.info("   Stripe.apiKey Final: {}", apiKey != null ? "..." + apiKey.substring(apiKey.length() - 4) : "null");
                    logger.info("   Stripe.API_VERSION Final: {}", Stripe.API_VERSION); // Acesso correto à variável
                    logger.info("METADADOS DO OBJETO RETORNADO:");
                    logger.info("   paymentIntent.getMetadata(): {}", paymentIntent.getMetadata());
                    logger.info("   JSON Completo do Objeto: {}", paymentIntent.toJson());
                    logger.info("----------------- FIM DA ANÁLISE FORENSE -----------------");
                    // --- FIM DA ANÁLISE FORENSE ---

                   reservaIdStr = paymentIntent.getMetadata().get("reserva_id");

                } catch (StripeException e) {
                    logger.error("❌ Erro ao buscar o PaymentIntent completo: {}", eventPaymentIntent.getId(), e);
                }
            }
        } else {
             logger.info("🤷‍♀️ Evento não tratado do tipo: {}", event.getType());
        }

        if (reservaIdStr != null && !reservaIdStr.isEmpty()) {
            logger.info("✅ Sucesso! Encontrado reserva_id: {}. A confirmar a reserva.", reservaIdStr);
            try {
                reservaService.confirmarReserva(Long.parseLong(reservaIdStr));
            } catch (Exception e) {
                logger.error("❌ Erro ao processar a confirmação da reserva ID {}", reservaIdStr, e);
            }
        } else if ("payment_intent.succeeded".equals(event.getType())) {
            logger.warn("⚠️ Webhook de sucesso recebido mas 'reserva_id' não foi encontrado.");
        }

        return ResponseEntity.ok("Success");
    }
}
