package br.com.caracameusonho.api.application.controller.admin;

import br.com.caracameusonho.api.application.dto.ReservaAdminViewDTO;
import br.com.caracameusonho.api.application.dto.UpdateReservaStatusDTO;
import br.com.caracameusonho.api.domain.service.ReservaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/reservas")
@AllArgsConstructor
public class AdminReservasController {

    private final ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<ReservaAdminViewDTO>> listAllReservas() {
        return ResponseEntity.ok(reservaService.findAllForAdmin());
    }

    @PutMapping("/{reservaId}/status")
    public ResponseEntity<ReservaAdminViewDTO> updateReservaStatus(
            @PathVariable Long reservaId,
            @Valid @RequestBody UpdateReservaStatusDTO statusDTO) {
        
        ReservaAdminViewDTO reservaAtualizada = reservaService.updateStatus(reservaId, statusDTO.newStatus());
        return ResponseEntity.ok(reservaAtualizada);
    }
}
