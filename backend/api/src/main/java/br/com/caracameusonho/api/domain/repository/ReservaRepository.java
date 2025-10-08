package br.com.caracameusonho.api.domain.repository;

import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.model.Usuario;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuario(Usuario usuario);

	@Transactional
	void deleteByPacoteViagemId(Long pacoteId);

	boolean existsByPacoteViagemIdAndUsuarioAndStatus(Long pacoteId, Usuario usuario, String status);
}
