package br.com.caracameusonho.api.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java. time.LocalDate;

@Data
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "pacote_viagem")
public class PacoteViagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Voltando para IDENTITY, que é mais simples e deve funcionar com o nome correto.
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String destino;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private LocalDate dataPartida;

    @Column(nullable = false)
    private Integer duracaoDias;

    @Column(nullable = false)
    private BigDecimal preco;

    @Column(nullable = false)
    private Integer vagasDisponiveis;

    @Column(nullable = false)
    private String urlFotoPrincipal;

    @Column(nullable = false)
    private boolean featured;
}
