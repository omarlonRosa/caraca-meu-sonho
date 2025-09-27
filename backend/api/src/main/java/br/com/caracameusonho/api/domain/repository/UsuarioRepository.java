package br.com.caracameusonho.api.domain.repository;

import br.com.caracameusonho.api.domain.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByResetPasswordToken(String token);
}
