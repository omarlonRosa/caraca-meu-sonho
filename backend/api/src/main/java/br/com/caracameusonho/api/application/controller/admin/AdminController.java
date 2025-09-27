package br.com.caracameusonho.api.application.controller.admin;

import br.com.caracameusonho.api.application.dto.CreatePacoteDTO;
import br.com.caracameusonho.api.application.dto.DashboardMetricsDTO;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import br.com.caracameusonho.api.domain.service.DashboardService;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final PacoteViagemRepository pacoteViagemRepository;
    private final PacoteViagemService pacoteViagemService;
    private final DashboardService dashboardService;

    @GetMapping("/dashboard/metrics")
    public ResponseEntity<DashboardMetricsDTO> getDashboardMetrics(){
        DashboardMetricsDTO metrics = dashboardService.getMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/pacotes")
    public ResponseEntity<List<PacoteViagem>> getAllPacotes() {
        List<PacoteViagem> pacotes = pacoteViagemRepository.findAll();
        return ResponseEntity.ok(pacotes);
    }

    // CORREÇÃO 1: Removido o "{id}" da URL
    @PostMapping("/pacotes")
    public ResponseEntity<PacoteViagem> createPacote(@RequestBody CreatePacoteDTO data) {
        PacoteViagem novoPacote = pacoteViagemService.create(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPacote);
    }

    @GetMapping("/pacotes/{id}")
    // CORREÇÃO 2: Adicionado (value = "id")
    public ResponseEntity<PacoteViagem> getPacoteById(@PathVariable(value = "id") Long id) {
        PacoteViagem pacote = pacoteViagemService.findById(id);
        return ResponseEntity.ok(pacote);
    } 

    @PutMapping("/pacotes/{id}")
    // CORREÇÃO 3: Adicionado (value = "id")
    public ResponseEntity<PacoteViagem> updatePacote(@PathVariable(value = "id") Long id, @RequestBody CreatePacoteDTO data) {
        PacoteViagem pacoteAtualizado = pacoteViagemService.update(id, data);
        return ResponseEntity.ok(pacoteAtualizado);
    }

    @DeleteMapping("/pacotes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    // CORREÇÃO 4: Adicionado (value = "id")
    public void deletePacote(@PathVariable(value = "id") Long id) {
        pacoteViagemService.deleteById(id);
    }
}
