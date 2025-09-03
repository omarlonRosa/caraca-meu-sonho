package com.caracameusonho.api.domain.service;

import com.caracameusonho.api.domain.model.PacoteViagem;
import com.caracameusonho.api.domain.model.Usuario;
import com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import com.caracameusonho.api.domain.repository.UsuarioRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeCheckoutService {

  @Value("${stripe.api.secret-key}")
  private String secretKey;

  @Value("${app.frontend.url}")
  private String frontendUrl;

  @Autowired
  private PacoteViagemRepository pacoteViagemRepository;

  @Autowired
    private UsuarioRepository usuarioRepository;

  @PostConstruct
  public void init() {
    Stripe.apiKey = secretKey;
  }

  public Session createCheckoutSession(Long pacoteId, Long usuarioId) throws StripeException {
    PacoteViagem pacote = pacoteViagemRepository.findById(pacoteId)
            .orElseThrow(() -> new RuntimeException("Pacote de viagem não encontrado!"));

    Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));


    String domainURL = frontendUrl;

    String imageUrl = pacote.getUrlFotoPrincipal();
    if (imageUrl != null && imageUrl.startsWith("/")) {
        imageUrl = domainURL + imageUrl;
    }

    SessionCreateParams.LineItem.PriceData.ProductData productData = 
        SessionCreateParams.LineItem.PriceData.ProductData.builder()
            .setName(pacote.getTitulo())
            .setDescription(pacote.getDestino())
            .addImage(imageUrl)
            .build();

    SessionCreateParams.LineItem.PriceData priceData = 
        SessionCreateParams.LineItem.PriceData.builder()
            .setCurrency("brl")
            .setUnitAmount(pacote.getPreco().longValue() * 100)
            .setProductData(productData)
            .build();

    SessionCreateParams params = SessionCreateParams.builder()
        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl(domainURL + "/reserva/sucesso?session_id={CHECKOUT_SESSION_ID}")
        .setCancelUrl(domainURL + "/viagem/" + pacoteId)
        .addLineItem(
            SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(priceData)
                .build()
        )
                .putMetadata("pacote_viagem_id", pacoteId.toString())
                .putMetadata("usuario_id", usuarioId.toString())
                .build();
    
    return Session.create(params);
  }
}
