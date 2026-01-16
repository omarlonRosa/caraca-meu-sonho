package br.com.caracameusonho.api.application.dto;

import java.util.List;

public record UpdateReservaDocsDTO(
    String urlPassagem,
    String urlHotelVoucher,
    String urlSeguroViagem,
    List<String> urlsOutros
) {}
