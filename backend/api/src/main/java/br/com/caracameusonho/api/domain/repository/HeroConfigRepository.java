package br.com.caracameusonho.api.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.caracameusonho.api.domain.model.HeroConfig;

public interface HeroConfigRepository extends JpaRepository<HeroConfig, Long> {

	List<HeroConfig> findByActiveTrue();

	
}
