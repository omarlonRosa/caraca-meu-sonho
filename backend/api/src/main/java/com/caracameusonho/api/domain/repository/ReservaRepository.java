package com.caracameusonho.api.domain.repository;

import com.caracameusonho.api.domain.model.Reserva;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
  List<Reserva> findByUsuarioEmailOrderByDataReservaDesc(String email);

  List<Reserva> findByStatus(String status);
    
    Page<Reserva> findByStatus(String status, Pageable pageable);
}
