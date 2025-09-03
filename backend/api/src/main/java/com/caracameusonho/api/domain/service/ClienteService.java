package com.caracameusonho.api.domain.service;

import com.caracameusonho.api.domain.model.DocumentoViagem;
import com.caracameusonho.api.domain.model.FotoViagem;
import com.caracameusonho.api.domain.model.Reserva;
import com.caracameusonho.api.domain.repository.DocumentoViagemRepository;
import com.caracameusonho.api.domain.repository.FotoViagemRepository;
import com.caracameusonho.api.domain.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ReservaRepository reservaRepository;

  @Autowired
    private DocumentoViagemRepository documentoViagemRepository;

  @Autowired
    private FotoViagemRepository fotoViagemRepository;

    public List<Reserva> buscarReservasDoUsuario(String email) {
        return reservaRepository.findByUsuarioEmailOrderByDataReservaDesc(email);
    }

  public List<DocumentoViagem> buscarDocumentosDaReserva(Long reservaId) {
        return documentoViagemRepository.findByReservaId(reservaId);
    }

  public List<FotoViagem> buscarFotosDaReserva(Long reservaId) {
        return fotoViagemRepository.findByReservaId(reservaId);
    }
}
