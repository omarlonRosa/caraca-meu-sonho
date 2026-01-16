package br.com.caracameusonho.api.application.controller.admin;

import br.com.caracameusonho.api.application.dto.CreatePacoteDTO;
import br.com.caracameusonho.api.application.dto.DashboardMetricsDTO;
import br.com.caracameusonho.api.application.dto.PacoteViagemDTO;
import br.com.caracameusonho.api.application.dto.ReservaDTO;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.service.DashboardService;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import br.com.caracameusonho.api.domain.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PacoteViagemService pacoteViagemService;
    private final DashboardService dashboardService;
    private final ReservaService reservaService;

    @GetMapping("/dashboard/metrics")
    public ResponseEntity<DashboardMetricsDTO> getDashboardMetrics(){
        DashboardMetricsDTO metrics = dashboardService.getMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/pacotes")
    public ResponseEntity<List<PacoteViagemDTO>> getAllPacotes() {
        List<PacoteViagemDTO> pacotes = pacoteViagemService.findAll().stream()
                .map(PacoteViagemDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(pacotes);
    }

    @GetMapping("/pacotes/{id}")
    public ResponseEntity<PacoteViagemDTO> getPacoteById(@PathVariable Long id) {
        PacoteViagem pacote = pacoteViagemService.buscarPorId(id);
        return ResponseEntity.ok(new PacoteViagemDTO(pacote));
    }

    @PostMapping(value = "/pacotes", consumes = {"multipart/form-data"})
    public ResponseEntity<PacoteViagemDTO> createPacote(
            @RequestPart("dados") CreatePacoteDTO data,
            @RequestPart(value = "foto", required = false) MultipartFile foto) {
        
        PacoteViagem novoPacote = pacoteViagemService.criarPacote(data, foto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PacoteViagemDTO(novoPacote));
    }

    @PutMapping(value = "/pacotes/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<PacoteViagemDTO> updatePacote(
            @PathVariable Long id,
            @RequestPart("dados") CreatePacoteDTO data,
            @RequestPart(value = "foto", required = false) MultipartFile foto) {
        
        PacoteViagem pacoteAtualizado = pacoteViagemService.atualizarPacote(id, data, foto);
        return ResponseEntity.ok(new PacoteViagemDTO(pacoteAtualizado));
    }

    @DeleteMapping("/pacotes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePacote(@PathVariable Long id) {
        pacoteViagemService.excluir(id);
    }

  
    @DeleteMapping("/pacotes/{id}/galeria/{fotoId}")
        public ResponseEntity<Void> deletarFotoGaleria(@PathVariable Long id, @PathVariable Long fotoId) {
            pacoteViagemService.removerFotoGaleria(id, fotoId);
            return ResponseEntity.noContent().build();
        }


    @PostMapping(value = "/pacotes/{pacoteId}/galeria", consumes = "multipart/form-data")
    public ResponseEntity<PacoteViagemDTO> adicionarFotosGaleria(
            @PathVariable Long pacoteId,
            @RequestParam("files") List<MultipartFile> files
    ) {
        for (MultipartFile file : files) {
            pacoteViagemService.adicionarFotoGaleria(pacoteId, file);
        }
        PacoteViagem pacote = pacoteViagemService.buscarPorId(pacoteId);
        return ResponseEntity.ok(new PacoteViagemDTO(pacote));
    }

   }
