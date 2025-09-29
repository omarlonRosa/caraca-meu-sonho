package br.com.caracameusonho.api.application.controller.v1;

import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class PublicV1Controller {

    private final PacoteViagemService pacoteViagemService;

    @GetMapping("/destinations/{id}")
    public ResponseEntity<PacoteViagem> getPacoteById(@PathVariable("id") Long id) {
        PacoteViagem pacote = pacoteViagemService.findById(id);
        return ResponseEntity.ok(pacote);
    }
}
