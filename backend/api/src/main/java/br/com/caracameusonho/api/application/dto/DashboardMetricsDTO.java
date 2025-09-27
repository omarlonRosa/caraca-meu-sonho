package br.com.caracameusonho.api.application.dto;

import java.time.LocalDate;

public record DashboardMetricsDTO(
  long totalPacotes,
  long totalUsuarios,
  String proximaViagemTitulo,
  LocalDate proximaViagemData
) {}
