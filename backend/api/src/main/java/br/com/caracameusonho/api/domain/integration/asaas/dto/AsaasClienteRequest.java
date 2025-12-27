package br.com.caracameusonho.api.domain.integration.asaas.dto;

public record AsaasClienteRequest(
    String name,
    String cpfCnpj
) {}
