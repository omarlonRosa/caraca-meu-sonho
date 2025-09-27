package br.com.caracameusonho.api.domain.model;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "usuario")
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

	 private static final Logger logger = LoggerFactory.getLogger(Usuario.class);



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;


    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String roles;

	private String resetPasswordToken;
    private LocalDateTime resetPasswordTokenExpiryDate;

	private String fotoPerfilUrl;

	@jakarta.persistence.PostLoad
    public void logPasswordOnLoad() {
        logger.info("Usuário [{}] carregado do banco. Hash da senha: [{}]", this.email, this.senha);
    }


  @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(this.roles.split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
  }

    @Override
    public boolean isAccountNonExpired() {
        return true;
  }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; 
    }

    @Override
    public boolean isEnabled() {
        return true; 
    }
}
