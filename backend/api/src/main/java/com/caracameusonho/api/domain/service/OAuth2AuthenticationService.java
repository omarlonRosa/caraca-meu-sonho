package com.caracameusonho.api.domain.service;

import com.caracameusonho.api.domain.model.Usuario;
import com.caracameusonho.api.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OAuth2AuthenticationService extends DefaultOAuth2UserService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        // Extrai o e-mail do usuário do Google
        String email = oAuth2User.getAttribute("email");
        String nome = oAuth2User.getAttribute("name");
        
        // Verifica se o usuário já existe no banco de dados
        Optional<Usuario> optionalUser = usuarioRepository.findByEmail(email);
        Usuario usuario;

        if (optionalUser.isPresent()) {
            // Se o usuário já existe, atualizamos o nome se necessário
            usuario = optionalUser.get();
            if (!usuario.getNome().equals(nome)) {
                usuario.setNome(nome);
                usuarioRepository.save(usuario);
            }
        } else {
            // Se o usuário não existe, criamos um novo
            usuario = new Usuario();
            usuario.setNome(nome);
            usuario.setEmail(email);
            // Definimos uma senha aleatória para atender aos requisitos do Spring Security
            usuario.setSenha("{noop}google_user_" + System.currentTimeMillis());
            usuario.setRoles("USER");
            usuarioRepository.save(usuario);
        }

        return oAuth2User;
    }
}
