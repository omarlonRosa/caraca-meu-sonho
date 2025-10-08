package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.Reserva;
import java.time.LocalDateTime;

public record ReservaAdminViewDTO(
    Long reservaId,
    String status,
    LocalDateTime dataReserva,
    Long pacoteId,
    String pacoteTitulo,
    Long clienteId,
    String clienteNome,
    String clienteEmail
) {
    public ReservaAdminViewDTO(Reserva reserva) {
        this(
            reserva.getId(),
            reserva.getStatus(),
            reserva.getDataReserva(),
            reserva.getPacoteViagem().getId(),
            reserva.getPacoteViagem().getTitulo(),
            reserva.getUsuario().getId(),
            reserva.getUsuario().getNome(),
            reserva.getUsuario().getEmail()
        );
    }
}
