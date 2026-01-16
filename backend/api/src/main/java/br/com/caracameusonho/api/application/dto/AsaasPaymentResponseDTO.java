package br.com.caracameusonho.api.application.dto;

public record AsaasPaymentResponseDTO(
    String id,
    String invoiceUrl,
    String bankSlipUrl,
    String netValue,
    String status
) {}
