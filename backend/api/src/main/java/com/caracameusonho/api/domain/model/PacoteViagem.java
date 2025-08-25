package com.caracameusonho.api.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class PacoteViagem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include

  private Long id;

  private String titulo;
  private String destino;
  private String descricao;
  private LocalDate dataPartida;
  private int duracaoDias;
  private BigDecimal preco;
  private int vagasDisponiveis;
  private String urlFotoPrincipal;

}
