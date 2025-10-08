package br.com.caracameusonho.api.application.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateReservaStatusDTO(
    @NotBlank String newStatus
) {}
