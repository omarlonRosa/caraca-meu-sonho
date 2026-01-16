package br.com.caracameusonho.api.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pacote_viagem")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PacoteViagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String destino;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private LocalDate dataPartida;

    private Integer duracaoDias;

    private BigDecimal preco;

    @Column(columnDefinition = "TEXT")
    private String urlFotoPrincipal;

    private Integer vagasDisponiveis;

    private boolean featured; 

    @Column(columnDefinition = "TEXT")
    private String dicasViagem;

    @Column(columnDefinition = "TEXT")
    private String roteiroUrl; 

    @OneToMany(mappedBy = "pacoteViagem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FotoGaleria> galeriaFotos = new ArrayList<>();
}
