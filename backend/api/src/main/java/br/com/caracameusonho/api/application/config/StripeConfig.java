package br.com.caracameusonho.api.application.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;

@Configuration
public class StripeConfig {

  @Value("${stripe.api.secret-key}")
  private String secretKey;

  @PostConstruct
  public void init() {
    Stripe.apiKey = secretKey;
    System.out.println("--- StripeConfig INICIALIZADO: Chave de API da Stripe configurada. ---");
  }
}
