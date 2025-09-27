package br.com.caracameusonho.api.application.dto;

public record CreatePaymentIntentDTO(
    Long pacoteId,
    Long reservaId
) {}
