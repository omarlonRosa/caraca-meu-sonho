package br.com.caracameusonho.api.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;

public record CreatePacoteDTO(
    String titulo,
    String destino,
    String descricao,
    
    String dicasViagem,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate dataPartida,

    Integer duracaoDias,
    BigDecimal preco,
    Integer vagasDisponiveis,
    String urlFotoPrincipal,
    boolean featured
) {}
