package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.application.dto.CreateReservaDTO;
import br.com.caracameusonho.api.application.dto.ReservaDTO;
import br.com.caracameusonho.api.domain.model.FotoGaleria;
import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.ReservaRepository;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import br.com.caracameusonho.api.domain.service.ReservaService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/me")
@AllArgsConstructor
public class MeController {

    private final ReservaRepository reservaRepository;
    private final ReservaService reservaService;

	 private final PacoteViagemService pacoteViagemService;

     @PostMapping("/reservas")
    public ResponseEntity<Reserva> createReserva(
            @RequestBody CreateReservaDTO data,
            @AuthenticationPrincipal Usuario usuario
    ) {
        Reserva novaReserva = reservaService.createPendingReserva(data.pacoteId(), usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaReserva);
    }


	@GetMapping("/pacotes/{pacoteId}/galeria")
    public ResponseEntity<List<FotoGaleria>> getGaleriaDoPacote(
        @PathVariable("pacoteId") Long pacoteId,
        @AuthenticationPrincipal Usuario usuario
    ) {
        List<FotoGaleria> galeria = pacoteViagemService.getGaleriaParaUsuario(pacoteId, usuario);
        return ResponseEntity.ok(galeria);
    }


	@GetMapping("/reservas")
public ResponseEntity<List<ReservaDTO>> getMinhasReservas(@AuthenticationPrincipal Usuario usuario) {
    List<ReservaDTO> reservasDto = reservaService.findByUsuarioAsDto(usuario);
    return ResponseEntity.ok(reservasDto);
}


}
