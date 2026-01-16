package br.com.caracameusonho.api.application.dto;

import java.math.BigDecimal;

public record CreateAsaasPaymentDTO(
    Long pacoteId,
    Long reservaId,
    String billingType, 
    BigDecimal value,
    String customerId
) {}
