package br.com.caracameusonho.api.application.dto;

import java.util.List;

import br.com.caracameusonho.api.domain.model.HeroConfig.HeroType;

public record HeroConfigDTO(
	HeroType type,
	String title,
	String subtitle,
	String mainUrl,
	List<String> slideImageUrls 
) {
}
