package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class PaymentService {

    private final PacoteViagemRepository pacoteViagemRepository;

    public PaymentIntent createPaymentIntent(Long pacoteId, Long reservaId) throws StripeException {
        PacoteViagem pacote = pacoteViagemRepository.findById(pacoteId)
                .orElseThrow(() -> new EntityNotFoundException("Pacote não encontrado"));

        long amountInCents = pacote.getPreco().multiply(new java.math.BigDecimal("100")).longValue();

        Map<String, String> metadata = new HashMap<>();
        metadata.put("reserva_id", reservaId.toString());

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency("brl")
                .putAllMetadata(metadata)
                .setAutomaticPaymentMethods(
                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                )
                .build();

        return PaymentIntent.create(params);
    }
}
