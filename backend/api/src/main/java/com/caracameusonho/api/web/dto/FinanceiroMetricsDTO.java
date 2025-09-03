package com.caracameusonho.api.web.dto;

import java.math.BigDecimal;
import java.util.List;

public class FinanceiroMetricsDTO {

    private final BigDecimal totalFaturado;
    private final long totalReservasConcluidas;
    private final List<ReservaDetalhesDTO> ultimasReservas;

    public FinanceiroMetricsDTO(BigDecimal totalFaturado, long totalReservasConcluidas, List<ReservaDetalhesDTO> ultimasReservas) {
        this.totalFaturado = totalFaturado;
        this.totalReservasConcluidas = totalReservasConcluidas;
        this.ultimasReservas = ultimasReservas;
    }

    public BigDecimal getTotalFaturado() {
        return totalFaturado;
    }

    public long getTotalReservasConcluidas() {
        return totalReservasConcluidas;
    }

    public List<ReservaDetalhesDTO > getUltimasReservas() {
        return ultimasReservas;
    }
}
