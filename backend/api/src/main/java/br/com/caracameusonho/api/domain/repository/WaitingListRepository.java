package br.com.caracameusonho.api.domain.repository;

import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.model.WaitingListEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WaitingListRepository extends JpaRepository<WaitingListEntry, Long> {

    boolean existsByUsuarioAndPacoteViagem(Usuario usuario, PacoteViagem pacoteViagem);

    Optional<WaitingListEntry> findByUsuarioAndPacoteViagem(Usuario usuario, PacoteViagem pacoteViagem);
}
