package com.caracameusonho.api.web.dto;

public class MetricsDTO {

    private final long totalInscritosListaEspera;
    private final long totalReservas;
    private final long totalUsuarios;
    private final long totalPacotes;

    public MetricsDTO(long totalInscritosListaEspera, long totalReservas, long totalUsuarios, long totalPacotes) {
        this.totalInscritosListaEspera = totalInscritosListaEspera;
        this.totalReservas = totalReservas;
        this.totalUsuarios = totalUsuarios;
        this.totalPacotes = totalPacotes;
    }

    public long getTotalInscritosListaEspera() {
        return totalInscritosListaEspera;
    }

    public long getTotalReservas() {
        return totalReservas;
    }

    public long getTotalUsuarios() {
        return totalUsuarios;
    }
    
    public long getTotalPacotes() {
        return totalPacotes;
    }
}
