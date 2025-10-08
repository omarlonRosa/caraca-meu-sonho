package br.com.caracameusonho.api.application.dto;

import java.util.List;

public record DestinationsResponseDTO(
    List<PacoteViagemDTO> upcoming,
    List<PacoteViagemDTO> past
) {}
