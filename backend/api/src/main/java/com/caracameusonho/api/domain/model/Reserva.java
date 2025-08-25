package com.caracameusonho.api.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.OffsetDateTime;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private PacoteViagem pacoteViagem;

    @Enumerated(EnumType.STRING)
    private StatusReserva status;

    private OffsetDateTime dataCriacao;
    
    private String stripeSessionId;

    @PrePersist
    public void prePersist() {
        dataCriacao = OffsetDateTime.now();
    }
}
