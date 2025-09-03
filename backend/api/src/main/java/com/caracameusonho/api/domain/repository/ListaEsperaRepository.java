package com.caracameusonho.api.domain.repository;

import com.caracameusonho.api.domain.model.ListaEspera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ListaEsperaRepository extends JpaRepository<ListaEspera, Long> {

    Optional<ListaEspera> findByUsuarioEmailAndPacoteViagemId(String email, Long pacoteId);
}

