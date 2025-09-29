package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.application.dto.HeroConfigDTO;
import br.com.caracameusonho.api.domain.model.HeroConfig;
import br.com.caracameusonho.api.domain.service.HeroConfigService;
import lombok.AllArgsConstructor;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class HeroConfigController {

    private final HeroConfigService heroConfigService;

	@GetMapping("/v1/hero/active")
    public ResponseEntity<HeroConfig> getActiveHero() {
        HeroConfig activeConfig = heroConfigService.getActiveHeroConfig();
        
        return ResponseEntity.ok()
            .cacheControl(CacheControl.noCache())
            .body(activeConfig);
    }

    @GetMapping("/admin/hero")
    public ResponseEntity<HeroConfig> getAdminHero() {
        HeroConfig adminConfig = heroConfigService.getAdminHeroConfig();
        return ResponseEntity.ok(adminConfig);
    }

    @PutMapping("/admin/hero")
    public ResponseEntity<HeroConfig> updateAdminHero(@RequestBody HeroConfigDTO heroConfigDTO) {
        HeroConfig updatedConfig = heroConfigService.updateHeroConfig(heroConfigDTO);
        return ResponseEntity.ok(updatedConfig);
    }
}
