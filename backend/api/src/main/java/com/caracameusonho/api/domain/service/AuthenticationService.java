package com.caracameusonho.api.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.caracameusonho.api.domain.model.Usuario;
import com.caracameusonho.api.domain.repository.UsuarioRepository;

@Service
public class AuthenticationService implements UserDetailsService {

   @Autowired 
    private UsuarioRepository usuarioRepository;
   
  @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Encontra o usuário pelo e-mail no banco de dados
        Optional<Usuario> optionalUser = usuarioRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            Usuario usuario = optionalUser.get();
            // Retorna um UserDetails com base no usuário encontrado
            return User.builder()
                    .username(usuario.getEmail())
                    .password(usuario.getSenha()) // A senha já estará encodada
                    .roles(usuario.getRoles().split(","))
                    .build();
        } else {
            throw new UsernameNotFoundException("Usuário não encontrado: " + email);
        }
    }

   }
