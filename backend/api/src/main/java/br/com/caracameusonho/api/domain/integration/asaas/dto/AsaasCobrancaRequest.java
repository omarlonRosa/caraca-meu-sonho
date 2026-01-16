package br.com.caracameusonho.api.domain.integration.asaas.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDate;

public record AsaasCobrancaRequest(
    @JsonProperty("customer") String customer,
    @JsonProperty("billingType") String billingType,
    @JsonProperty("value") BigDecimal value,
    
    @JsonProperty("dueDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") 
    LocalDate dueDate,
    
    @JsonProperty("description") String description,
    @JsonProperty("externalReference") String externalReference
) {}
