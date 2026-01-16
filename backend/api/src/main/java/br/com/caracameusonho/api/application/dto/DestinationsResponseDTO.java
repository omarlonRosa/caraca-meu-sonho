package br.com.caracameusonho.api.application.dto;

import java.util.List;

public record DestinationsResponseDTO(
    List<PacoteViagemPublicDTO> featured, 
    List<PacoteViagemPublicDTO> upcoming,
    List<PacoteViagemPublicDTO> all       
) {}
