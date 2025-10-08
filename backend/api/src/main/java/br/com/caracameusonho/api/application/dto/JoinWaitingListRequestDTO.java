package br.com.caracameusonho.api.application.dto;

import jakarta.validation.constraints.NotNull;

public record JoinWaitingListRequestDTO(
    @NotNull
    Long pacoteId
) {}
