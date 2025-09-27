package br.com.caracameusonho.api.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "reserva") // Nome da tabela no data.sql
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne // Muitos reservas para UM usuário
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne // Muitas reservas para UM pacote de viagem
    @JoinColumn(name = "pacote_viagem_id", nullable = false)
    private PacoteViagem pacoteViagem;

    @Column(nullable = false)
    private LocalDateTime dataReserva;

    @Column(nullable = false)
    private String status; 
}
