package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final ImageUploadService imageUploadService;
    private final TokenService tokenService;

    public String alterarFotoPerfil(Usuario usuario, MultipartFile file) throws IOException {
        String novaFotoUrl = imageUploadService.upload(file, "image");

        usuario.setFotoPerfilUrl(novaFotoUrl);

        Usuario usuarioAtualizado = usuarioRepository.save(usuario);

        return tokenService.generateToken(usuarioAtualizado);
    }
}
