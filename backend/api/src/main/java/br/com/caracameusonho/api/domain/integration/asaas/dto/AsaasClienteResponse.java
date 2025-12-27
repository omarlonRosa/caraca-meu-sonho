package br.com.caracameusonho.api.domain.integration.asaas.dto;


public record AsaasClienteResponse(
    String id,
    String name,
    String cpfCnpj
) {}
