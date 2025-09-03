package com.caracameusonho.api.domain.service;

import com.caracameusonho.api.domain.model.Usuario;
import com.caracameusonho.api.domain.repository.UsuarioRepository;
import com.caracameusonho.api.web.dto.RegisterRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Usuario> registerNewUser(RegisterRequestDTO data) {
        Optional<Usuario> existingUser = usuarioRepository.findByEmail(data.email());
        if (existingUser.isPresent()) {
            return Optional.empty(); 
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setEmail(data.email());
        novoUsuario.setNome(data.nome());
        novoUsuario.setSenha(passwordEncoder.encode(data.senha())); 
        novoUsuario.setRoles("USER");

        return Optional.of(usuarioRepository.save(novoUsuario));
    }
}
