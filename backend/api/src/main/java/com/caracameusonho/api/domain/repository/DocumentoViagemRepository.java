package com.caracameusonho.api.domain.repository;

import com.caracameusonho.api.domain.model.DocumentoViagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentoViagemRepository extends JpaRepository<DocumentoViagem, Long> {

    List<DocumentoViagem> findByReservaId(Long reservaId);
}
