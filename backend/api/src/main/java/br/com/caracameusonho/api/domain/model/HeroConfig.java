package br.com.caracameusonho.api.domain.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.*;

@Getter
@Setter
@ToString(exclude = {"slides"}) 
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "hero_config")
public class HeroConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HeroType type;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String subtitle;

    @Column(columnDefinition = "TEXT")
    private String mainUrl;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "hero_config_id")
    private List<HeroSlide> slides = new ArrayList<>();

    @Column(nullable = false)
    private boolean active = false;

    public enum HeroType {
        VIDEO,
        BANNER,
        SLIDESHOW
    }
}
