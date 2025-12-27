package br.com.caracameusonho.api.domain.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@ToString(exclude = {"galeriaFotos", "reservas"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "pacote_viagem")
public class PacoteViagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String titulo;
    private String destino;
    @Column(columnDefinition = "TEXT")
    private String descricao;
    private LocalDate dataPartida;
    private Integer duracaoDias;
    private BigDecimal preco;
    private Integer vagasDisponiveis;
    @Column(columnDefinition = "TEXT")
    private String urlFotoPrincipal;
    private boolean featured;

    @Column(columnDefinition = "TEXT")
    private String roteiroURL;

    @Column(columnDefinition = "TEXT")
    private String dicasViagem;

    @OneToMany(mappedBy = "pacoteViagem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FotoGaleria> galeriaFotos = new ArrayList<>();

    @OneToMany(mappedBy = "pacoteViagem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Reserva> reservas = new ArrayList<>();
}
