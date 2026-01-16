package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.application.dto.PacoteViagemPublicDTO;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pacotes") 
@RequiredArgsConstructor
public class PacoteViagemController {

    private final PacoteViagemService pacoteViagemService;

    @GetMapping
    public ResponseEntity<List<PacoteViagemPublicDTO>> listarTodos() {
        var pacotes = pacoteViagemService.listarTodos().stream()
                .map(PacoteViagemPublicDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(pacotes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacoteViagemPublicDTO> buscarPorId(@PathVariable Long id) {
        var pacote = pacoteViagemService.buscarPorId(id);
        return ResponseEntity.ok(new PacoteViagemPublicDTO(pacote));
    }
}
