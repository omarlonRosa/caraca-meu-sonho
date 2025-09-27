package br.com.caracameusonho.api.domain.repository;

import br.com.caracameusonho.api.domain.model.PacoteViagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacoteViagemRepository extends JpaRepository<PacoteViagem, Long> {
}
