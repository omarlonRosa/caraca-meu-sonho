package com.caracameusonho.api.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.caracameusonho.api.domain.model.PacoteViagem;
import com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import com.caracameusonho.api.domain.service.PacoteViagemService;

@RestController
@RequestMapping("/pacotes")
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class PacoteViagemController {

  @Autowired
  private PacoteViagemRepository pacoteViagemRepository;

  @Autowired
  private PacoteViagemService pacoteViagemService;

  @GetMapping
  public List<PacoteViagem> listar() {
    return pacoteViagemRepository.findAll();
  }

  @GetMapping("/{pacoteId}")
  public PacoteViagem buscar(@PathVariable Long pacoteId){
    return pacoteViagemService.buscar(pacoteId);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PacoteViagem criar(@RequestBody PacoteViagem pacoteViagem) {
    return pacoteViagemService.salvar(pacoteViagem);
  }

  @DeleteMapping("/{pacoteId}")
  public ResponseEntity<Void> excluir(@PathVariable Long pacoteId){
    pacoteViagemService.excluir(pacoteId);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{pacoteId}")
  public PacoteViagem atualizar(@PathVariable Long pacoteId, @RequestBody PacoteViagem pacote){
    return pacoteViagemService.atualizar(pacoteId, pacote);
  }
  
}
