package br.com.caracameusonho.api.domain.integration.asaas.dto;

public record AsaasCobrancaResponse(
    String id,
    String invoiceUrl,
    String bankSlipUrl,
    String status
) {}
