package com.caracameusonho.api.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caracameusonho.api.domain.model.PacoteViagem;
import com.caracameusonho.api.domain.repository.PacoteViagemRepository;

@Service
public class PacoteViagemService {

  @Autowired
  private PacoteViagemRepository pacoteViagemRepository;

  public PacoteViagem buscar(Long pacoteId) {
    return pacoteViagemRepository.findById(pacoteId)
            .orElseThrow(() -> new RuntimeException("Pacote de viagem não encontrado!"));

  }

  @Transactional
  public PacoteViagem salvar(PacoteViagem pacoteViagem) {
    return pacoteViagemRepository.save(pacoteViagem);
  }

  @Transactional
  public void excluir(Long pacoteId) {
    buscar(pacoteId);
    pacoteViagemRepository.deleteById(pacoteId);
  }

  @Transactional
  public PacoteViagem atualizar(Long pacoteId, PacoteViagem dadosAtualizados) {
    buscar(pacoteId);

    dadosAtualizados.setId(pacoteId);


    return pacoteViagemRepository.save(dadosAtualizados);
  }
  
}
