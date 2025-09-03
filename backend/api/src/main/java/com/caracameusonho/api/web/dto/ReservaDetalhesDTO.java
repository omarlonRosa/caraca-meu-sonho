package com.caracameusonho.api.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ReservaDetalhesDTO {

    private final String usuarioNome;
    private final String pacoteTitulo;
    private final BigDecimal valor;
    private final LocalDate dataReserva;
    private final String status;

    public ReservaDetalhesDTO(String usuarioNome, String pacoteTitulo, BigDecimal valor, LocalDate dataReserva, String status) {
        this.usuarioNome = usuarioNome;
        this.pacoteTitulo = pacoteTitulo;
        this.valor = valor;
        this.dataReserva = dataReserva;
        this.status = status;
    }

    public String getUsuarioNome() {
        return usuarioNome;
    }

    public String getPacoteTitulo() {
        return pacoteTitulo;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public LocalDate getDataReserva() {
        return dataReserva;
    }

    public String getStatus() {
        return status;
    }
}
