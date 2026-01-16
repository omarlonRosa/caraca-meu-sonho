package br.com.caracameusonho.api.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "waiting_list", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"usuario_id", "pacote_viagem_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaitingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "pacote_viagem_id", nullable = false)
    @JsonIgnore
    private PacoteViagem pacoteViagem;

    private LocalDateTime createdAt = LocalDateTime.now();
}
