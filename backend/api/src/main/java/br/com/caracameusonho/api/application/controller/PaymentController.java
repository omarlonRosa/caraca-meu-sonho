package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.application.dto.CreatePaymentIntentDTO;
import br.com.caracameusonho.api.application.dto.PaymentIntentDTO;
import br.com.caracameusonho.api.domain.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentDTO> createPaymentIntent(@RequestBody CreatePaymentIntentDTO payload) throws StripeException {
        Long pacoteId = payload.pacoteId();
        Long reservaId = payload.reservaId();

        PaymentIntent paymentIntent = paymentService.createPaymentIntent(pacoteId, reservaId);
        
        return ResponseEntity.ok(new PaymentIntentDTO(paymentIntent.getClientSecret()));
    }
}
