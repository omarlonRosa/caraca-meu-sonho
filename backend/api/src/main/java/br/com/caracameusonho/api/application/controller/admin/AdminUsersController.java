package br.com.caracameusonho.api.application.controller.admin;

import br.com.caracameusonho.api.application.dto.UserAdminUpdateDTO;
import br.com.caracameusonho.api.application.dto.UserAdminViewDTO;
import br.com.caracameusonho.api.domain.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@AllArgsConstructor
public class AdminUsersController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UserAdminViewDTO>> listAllUsers() {
        return ResponseEntity.ok(usuarioService.findAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAdminViewDTO> getUserById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(usuarioService.findUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAdminViewDTO> updateUser(@PathVariable("id") Long id, @Valid @RequestBody UserAdminUpdateDTO data) {
        return ResponseEntity.ok(usuarioService.updateUser(id, data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        usuarioService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
