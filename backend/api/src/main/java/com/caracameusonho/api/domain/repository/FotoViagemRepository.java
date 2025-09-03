package com.caracameusonho.api.domain.repository;

import com.caracameusonho.api.domain.model.FotoViagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotoViagemRepository extends JpaRepository<FotoViagem, Long> {

    List<FotoViagem> findByReservaId(Long reservaId);
}
