package br.com.caracameusonho.api.application.controller.v1;

import br.com.caracameusonho.api.application.dto.DestinationsResponse;
import br.com.caracameusonho.api.application.dto.DestinationsResponseDTO;
import br.com.caracameusonho.api.application.dto.PacoteViagemDTO;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class PublicV1Controller {

    private final PacoteViagemService pacoteViagemService;

    @GetMapping("/packages")
    public ResponseEntity<List<PacoteViagemDTO>> getAllPacotesPublic() {
        return ResponseEntity.ok(pacoteViagemService.findAllAsDto());
    }


	@GetMapping("/destinations")
    public ResponseEntity<DestinationsResponseDTO> getAllDestinations() {
        return ResponseEntity.ok(pacoteViagemService.findAllCategorized());
    }

    @GetMapping("/destinations/{id}")
    public ResponseEntity<PacoteViagemDTO> getPacoteById(@PathVariable Long id) {
        return ResponseEntity.ok(pacoteViagemService.findByIdAsDto(id));
    }

	}
