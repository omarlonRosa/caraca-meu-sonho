package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.Reserva;
import java.time.LocalDateTime;

public record ReservaDTO(
    Long id,
    Long pacoteViagemId,
    LocalDateTime dataReserva,
    String status,
    UsuarioDTO usuario // <-- ADICIONE ESTA LINHA
) {
    public ReservaDTO(Reserva reserva) {
        this(
            reserva.getId(),
            reserva.getPacoteViagem().getId(),
            reserva.getDataReserva(),
            reserva.getStatus(),
            new UsuarioDTO( // Crie o UsuarioDTO a partir da entidade Usuario
                reserva.getUsuario().getId(),
                reserva.getUsuario().getNome(),
                reserva.getUsuario().getEmail()
            )
        );
    }
}
