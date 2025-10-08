package br.com.caracameusonho.api.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.caracameusonho.api.application.dto.DestinationsResponseDTO;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;


@RestController
@RequestMapping("/api/v1/destinations")
public class DestinationController {


  @Autowired
  private PacoteViagemService pacoteViagemService;

@GetMapping
    public ResponseEntity<DestinationsResponseDTO> list() {
        DestinationsResponseDTO response = pacoteViagemService.findAllCategorized();
        return ResponseEntity.ok(response);
    }
 
}
