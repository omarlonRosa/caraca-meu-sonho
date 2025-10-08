package br.com.caracameusonho.api.application.controller.admin;

import br.com.caracameusonho.api.application.dto.CreatePacoteDTO;
import br.com.caracameusonho.api.application.dto.DashboardMetricsDTO;
import br.com.caracameusonho.api.application.dto.PacoteViagemDTO; 
import br.com.caracameusonho.api.domain.service.DashboardService;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import br.com.caracameusonho.api.application.dto.PacoteViagemAdminDTO;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final PacoteViagemService pacoteViagemService;
    private final DashboardService dashboardService;

    @GetMapping("/dashboard/metrics")
    public ResponseEntity<DashboardMetricsDTO> getDashboardMetrics(){
        DashboardMetricsDTO metrics = dashboardService.getMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/pacotes")
    public ResponseEntity<List<PacoteViagemDTO>> getAllPacotes() {
        List<PacoteViagemDTO> pacotes = pacoteViagemService.findAllAsDto();
        return ResponseEntity.ok(pacotes);
    }

    @PostMapping("/pacotes")
    public ResponseEntity<PacoteViagemDTO> createPacote(@RequestBody CreatePacoteDTO data) {
        PacoteViagemDTO novoPacoteDto = pacoteViagemService.createAndReturnDto(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPacoteDto);
    }

   

    @PutMapping("/pacotes/{id}")
    public ResponseEntity<PacoteViagemDTO> updatePacote(@PathVariable(value = "id") Long id, @RequestBody CreatePacoteDTO data) {
        PacoteViagemDTO pacoteAtualizadoDto = pacoteViagemService.updateAndReturnDto(id, data);
        return ResponseEntity.ok(pacoteAtualizadoDto);
    }

    @DeleteMapping("/pacotes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePacote(@PathVariable(value = "id") Long id) {
        pacoteViagemService.deleteById(id);
    }

	@PostMapping("/pacotes/{pacoteId}/galeria")
	public ResponseEntity<PacoteViagemDTO> adicionarFotosGaleria(
		@PathVariable("pacoteId") Long pacoteId,
		@RequestParam("files") List<MultipartFile> files
	) {
		PacoteViagemDTO pacoteAtualizadoDto = pacoteViagemService.addFotosAGaleriaAsDto(pacoteId, files);
		return ResponseEntity.ok(pacoteAtualizadoDto);
	}

	@GetMapping("/pacotes/{id}")
public ResponseEntity<PacoteViagemAdminDTO> getPacoteById(@PathVariable(value = "id") Long id) {
    PacoteViagemAdminDTO pacoteDto = pacoteViagemService.findByIdForAdmin(id);
    return ResponseEntity.ok(pacoteDto);
}


	}
