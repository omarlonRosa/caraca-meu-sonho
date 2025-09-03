package com.caracameusonho.api.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  private String nome;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String senha;

  private String roles;
}
