package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class ReservaDTO {

    private Long id;
    private LocalDateTime dataReserva;
    private String status;
    private String urlPassagem;
    private String urlHotelVoucher;
    private String urlSeguroViagem;
    private List<String> urlsOutros; 
    private String asaasBoletoUrl;
    private String asaasPixQrcode;
    
    private PacoteResumoDTO pacoteViagem; 

    public ReservaDTO(Reserva reserva) {
        this.id = reserva.getId();
        this.dataReserva = reserva.getDataReserva();
        this.status = reserva.getStatus();
        this.urlPassagem = reserva.getUrlPassagem();
        this.urlHotelVoucher = reserva.getUrlHotelVoucher();
        this.urlSeguroViagem = reserva.getUrlSeguroViagem();
        this.urlsOutros = reserva.getUrlsOutros(); 
        this.asaasBoletoUrl = reserva.getAsaasBoletoUrl();
        this.asaasPixQrcode = reserva.getAsaasPixQrcode();
        
        if (reserva.getPacoteViagem() != null) {
            this.pacoteViagem = new PacoteResumoDTO(reserva.getPacoteViagem());
        }
    }

    @Getter
    @NoArgsConstructor
    public static class PacoteResumoDTO {
        private Long id;
        private String titulo;
        private String destino;
        private String urlFotoPrincipal;
        private String descricao;
        private java.time.LocalDate dataPartida;
        private Integer duracaoDias;
        private Double preco;

        public PacoteResumoDTO(PacoteViagem pacote) {
            this.id = pacote.getId();
            this.titulo = pacote.getTitulo();
            this.destino = pacote.getDestino();
            this.urlFotoPrincipal = pacote.getUrlFotoPrincipal();
            this.descricao = pacote.getDescricao();
            this.dataPartida = pacote.getDataPartida();
            this.duracaoDias = pacote.getDuracaoDias();
            this.preco = pacote.getPreco() != null ? pacote.getPreco().doubleValue() : null;
        }
    }
}
