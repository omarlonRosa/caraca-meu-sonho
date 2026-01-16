package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.model.FotoGaleria;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class PacoteViagemDTO {

    private Long id;
    private String titulo;
    private String destino;
    private String descricao;
    private LocalDate dataPartida;
    private Integer duracaoDias;
    private BigDecimal preco;
    private String urlFotoPrincipal;
    private Integer vagasDisponiveis;
    private Boolean featured;
    private String dicasViagem;
    private String roteiroUrl;
    private List<FotoGaleria> galeriaFotos;

    public PacoteViagemDTO(PacoteViagem pacote) {
        this.id = pacote.getId();
        this.titulo = pacote.getTitulo();
        this.destino = pacote.getDestino();
        this.descricao = pacote.getDescricao();
        this.dataPartida = pacote.getDataPartida();
        this.duracaoDias = pacote.getDuracaoDias();
        this.preco = pacote.getPreco();
        this.urlFotoPrincipal = pacote.getUrlFotoPrincipal();
        this.vagasDisponiveis = pacote.getVagasDisponiveis();
        this.dicasViagem = pacote.getDicasViagem();
        
        this.featured = pacote.isFeatured(); 

        this.roteiroUrl = pacote.getRoteiroUrl(); 
        
        this.galeriaFotos = pacote.getGaleriaFotos(); 
    }
}
