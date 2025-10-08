package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.Usuario;

public record UserAdminViewDTO(
    Long id,
    String nome,
    String email,
    String roles,
    String fotoPerfilUrl
) {
    public UserAdminViewDTO(Usuario usuario) {
        this(
            usuario.getId(), 
            usuario.getNome(), 
            usuario.getEmail(), 
            usuario.getRoles(),
            usuario.getFotoPerfilUrl()
        );
    }
}
