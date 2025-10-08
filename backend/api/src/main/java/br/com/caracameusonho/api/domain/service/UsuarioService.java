package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.UserAdminUpdateDTO;
import br.com.caracameusonho.api.application.dto.UserAdminViewDTO;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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


	public List<UserAdminViewDTO> findAllUsers() {
        return usuarioRepository.findAll()
                .stream()
                .map(UserAdminViewDTO::new) 
                .collect(Collectors.toList());
    }

    public UserAdminViewDTO findUserById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
        return new UserAdminViewDTO(usuario);
    }

    @Transactional
    public UserAdminViewDTO updateUser(Long id, UserAdminUpdateDTO data) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        usuario.setNome(data.nome());
        usuario.setEmail(data.email());
        usuario.setRoles(data.roles());

        Usuario usuarioAtualizado = usuarioRepository.save(usuario);
        return new UserAdminViewDTO(usuarioAtualizado);
    }

    public void deleteUser(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado.");
        }
        usuarioRepository.deleteById(id);
    }


}
