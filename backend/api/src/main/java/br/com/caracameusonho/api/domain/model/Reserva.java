package br.com.caracameusonho.api.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reserva")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pacote_viagem_id", nullable = false)
    private PacoteViagem pacoteViagem;

    private LocalDateTime dataReserva = LocalDateTime.now();

    private String status; 

    private String urlPassagem;
    private String urlHotelVoucher;
    private String urlSeguroViagem;

    @ElementCollection
    @CollectionTable(name = "reserva_docs_extras", joinColumns = @JoinColumn(name = "reserva_id"))
    @Column(name = "url")
    private List<String> urlsOutros = new ArrayList<>();

    private String asaasCustomerId;
    private String asaasPaymentId;
    private String asaasBoletoUrl;
    private String asaasPixQrcode;
    private String asaasInvoiceUrl;
}
