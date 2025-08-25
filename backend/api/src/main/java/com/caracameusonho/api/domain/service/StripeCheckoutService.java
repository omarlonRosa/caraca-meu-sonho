package com.caracameusonho.api.domain.service;

import com.caracameusonho.api.domain.model.PacoteViagem;
import com.caracameusonho.api.domain.repository.PacoteViagemRepository;
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

  @Value("${app.frontend.url}") // Add this to your application.properties
  private String frontendUrl;

  @Autowired
  private PacoteViagemRepository pacoteViagemRepository;

  @PostConstruct
  public void init() {
    Stripe.apiKey = secretKey;
  }

  public Session createCheckoutSession(Long pacoteId) throws StripeException {
    PacoteViagem pacote = pacoteViagemRepository.findById(pacoteId)
            .orElseThrow(() -> new RuntimeException("Pacote de viagem não encontrado!"));

    // Use the frontend URL from configuration
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
        ).build();
    
    return Session.create(params);
  }
}
