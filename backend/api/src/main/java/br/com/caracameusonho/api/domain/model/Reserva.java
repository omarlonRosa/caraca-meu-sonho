package br.com.caracameusonho.api.domain.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pacote_viagem_id", nullable = false)
    private PacoteViagem pacoteViagem;

    private LocalDateTime dataReserva;
    private String status;

    private String urlPassagem;
    private String urlHotelVoucher;
    private String urlSeguroViagem;

    private String asaasCustomerId;
    private String asaasPaymentId;  
    private String asaasBoletoUrl;  
    private String asaasPixQrcode;
}
