package br.com.caracameusonho.api.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public record CreatePacoteDTO(
    String titulo,
    String destino,
    String descricao,

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate dataPartida,

    Integer duracaoDias,
    BigDecimal preco,
    Integer vagasDisponiveis,
    String urlFotoPrincipal,
    boolean featured
) {}
