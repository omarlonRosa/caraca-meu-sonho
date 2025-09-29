package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import lombok.AllArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthorizationService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

   /* public AuthorizationService(UsuarioRepository usuarioRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }*/

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }

    public void generatePasswordResetToken(String email) {
        usuarioRepository.findByEmail(email).ifPresent(usuario -> {

        String token = UUID.randomUUID().toString();

        usuario.setResetPasswordToken(token);
        usuario.setResetPasswordTokenExpiryDate(LocalDateTime.now().plusHours(1));

        usuarioRepository.save(usuario);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        emailService.sendPasswordResetEmail(usuario.getEmail(), usuario.getNome(), resetLink);
		});
    }

    public void resetPassword(String token, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("As senhas não coincidem.");
        }

        Usuario usuario = usuarioRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido ou não encontrado."));

        if (usuario.getResetPasswordTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("O token de redefinição de senha expirou.");
        }

        usuario.setSenha(passwordEncoder.encode(newPassword));

        usuario.setResetPasswordToken(null);
        usuario.setResetPasswordTokenExpiryDate(null);

        usuarioRepository.save(usuario);
    }
}
