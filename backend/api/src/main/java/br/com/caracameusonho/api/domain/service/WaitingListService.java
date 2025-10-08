package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.WaitingListEntryDTO;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.model.WaitingListEntry;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import br.com.caracameusonho.api.domain.repository.WaitingListRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class WaitingListService {

    private final WaitingListRepository waitingListRepository;
    private final UsuarioRepository usuarioRepository;
    private final PacoteViagemRepository pacoteViagemRepository;

    @Transactional
    public WaitingListEntryDTO joinWaitingList(Long usuarioId, Long pacoteId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));
        
        PacoteViagem pacote = pacoteViagemRepository.findById(pacoteId)
                .orElseThrow(() -> new EntityNotFoundException("Pacote de viagem não encontrado."));

        if (pacote.getVagasDisponiveis() > 0) {
            throw new IllegalStateException("Não é possível entrar na lista de espera. O pacote ainda possui vagas disponíveis.");
        }

        if (waitingListRepository.existsByUsuarioAndPacoteViagem(usuario, pacote)) {
            throw new IllegalStateException("Você já está na lista de espera para este pacote.");
        }

        WaitingListEntry newEntry = new WaitingListEntry();
        newEntry.setUsuario(usuario);
        newEntry.setPacoteViagem(pacote);

        WaitingListEntry savedEntry = waitingListRepository.save(newEntry);
        
        return new WaitingListEntryDTO(savedEntry);
    }
}
