package com.caracameusonho.api.domain.service;

import com.caracameusonho.api.domain.model.ListaEspera;
import com.caracameusonho.api.domain.model.PacoteViagem;
import com.caracameusonho.api.domain.model.Usuario;
import com.caracameusonho.api.domain.repository.ListaEsperaRepository;
import com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import com.caracameusonho.api.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ListaEsperaService {

    @Autowired
    private ListaEsperaRepository listaEsperaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacoteViagemRepository pacoteViagemRepository;

    public Optional<ListaEspera> inscreverNaListaEspera(String userEmail, Long pacoteId) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(userEmail);
        Optional<PacoteViagem> optionalPacote = pacoteViagemRepository.findById(pacoteId);

        if (optionalUsuario.isEmpty() || optionalPacote.isEmpty()) {
            return Optional.empty();         }

        Optional<ListaEspera> existingEntry = listaEsperaRepository.findByUsuarioEmailAndPacoteViagemId(userEmail, pacoteId);
        if (existingEntry.isPresent()) {
            return Optional.empty();        
    }

        ListaEspera novaInscricao = new ListaEspera();
        novaInscricao.setUsuario(optionalUsuario.get());
        novaInscricao.setPacoteViagem(optionalPacote.get());
        novaInscricao.setDataInscricao(LocalDateTime.now());

        return Optional.of(listaEsperaRepository.save(novaInscricao));
    }
}
