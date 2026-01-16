package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.Reserva;
import java.time.LocalDateTime;

public record ReservaAdminViewDTO(
    Long reservaId,
    String clienteNome,
    String clienteEmail,
    String pacoteTitulo,
    LocalDateTime dataReserva,
    String status
) {
    public ReservaAdminViewDTO(Reserva reserva) {
        this(
            reserva.getId(),
            reserva.getUsuario().getNome(),
            reserva.getUsuario().getEmail(),
            reserva.getPacoteViagem().getTitulo(),
            reserva.getDataReserva(),
            reserva.getStatus()
        );
    }
}
