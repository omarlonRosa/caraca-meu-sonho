package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.HeroConfigDTO;
import br.com.caracameusonho.api.domain.model.HeroConfig;
import br.com.caracameusonho.api.domain.model.HeroSlide;
import br.com.caracameusonho.api.domain.repository.HeroConfigRepository;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HeroConfigService {

    private final HeroConfigRepository heroConfigRepository;

	 private static final Logger logger = LoggerFactory.getLogger(HeroConfigService.class);

	public HeroConfig getActiveHeroConfig() {
    List<HeroConfig> activeConfigs = heroConfigRepository.findByActiveTrue();
    if (activeConfigs.isEmpty()) {
        logger.info("Nenhuma configuração de Hero ativa encontrada. Retornando configuração padrão.");
        
        // Criar configuração padrão
        HeroConfig defaultConfig = new HeroConfig();
        defaultConfig.setType(HeroConfig.HeroType.BANNER);
        defaultConfig.setTitle("Bem-vindo ao Caraca Meu Sonho!");
        defaultConfig.setSubtitle("Configure seu Hero no painel admin");
        defaultConfig.setMainUrl("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920");
        defaultConfig.setActive(false);
        return defaultConfig;
    }

    if (activeConfigs.size() > 1) {
        logger.warn("Múltiplas configurações de Hero ativas encontradas! Usando a primeira.");
    }
    return activeConfigs.get(0);
}



    @Transactional
    public HeroConfig getAdminHeroConfig() {
        HeroConfig config = heroConfigRepository.findAll().stream().findFirst().orElseGet(() -> {
            HeroConfig defaultConfig = new HeroConfig();
            defaultConfig.setType(HeroConfig.HeroType.BANNER);
            defaultConfig.setTitle("Título Padrão Editável");
            defaultConfig.setSubtitle("Clique aqui para começar");
            return defaultConfig;
        });

        config.setActive(true);
        return heroConfigRepository.save(config);
    }

    @Transactional
    public HeroConfig updateHeroConfig(HeroConfigDTO dto) {
        HeroConfig config = getAdminHeroConfig(); 

        config.setType(dto.type());
        config.setTitle(dto.title());
        config.setSubtitle(dto.subtitle());
        config.setMainUrl(dto.mainUrl());

        if (dto.type() == HeroConfig.HeroType.SLIDESHOW) {
            config.getSlides().clear();
            if (dto.slideImageUrls() != null && !dto.slideImageUrls().isEmpty()) {
                AtomicInteger sortOrder = new AtomicInteger(0);
                List<HeroSlide> newSlides = dto.slideImageUrls().stream().map(url -> {
                    HeroSlide slide = new HeroSlide();
                    slide.setImageUrl(url);
                    slide.setSortOrder(sortOrder.getAndIncrement());
                    return slide;
                }).collect(Collectors.toList());
                config.getSlides().addAll(newSlides);
            }
        } else {
            config.getSlides().clear();
        }

        return heroConfigRepository.save(config);
    }
}
