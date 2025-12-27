package br.com.caracameusonho.api.domain.integration.asaas.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record AsaasCobrancaRequest(
    String customer,
    String billingType,
    BigDecimal value,
    LocalDate dueDate,
    String description,
    String externalReference
) {}
