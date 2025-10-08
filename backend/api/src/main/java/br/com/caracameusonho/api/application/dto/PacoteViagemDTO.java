package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.PacoteViagem;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List; 
import java.util.stream.Collectors; 

public record PacoteViagemDTO(
    Long id,
    String titulo,
    String destino,
    String descricao,
    LocalDate dataPartida,
    Integer duracaoDias,
    BigDecimal preco,
    Integer vagasDisponiveis,
    String urlFotoPrincipal,
    boolean featured,
    List<ReservaDTO> reservas 
) {
    public PacoteViagemDTO(PacoteViagem pacote) {
        this(
            pacote.getId(),
            pacote.getTitulo(),
            pacote.getDestino(),
            pacote.getDescricao(),
            pacote.getDataPartida(),
            pacote.getDuracaoDias(),
            pacote.getPreco(),
            pacote.getVagasDisponiveis(),
            pacote.getUrlFotoPrincipal(),
            pacote.isFeatured(),
            pacote.getReservas().stream().map(ReservaDTO::new).collect(Collectors.toList())
        );
    }
}
