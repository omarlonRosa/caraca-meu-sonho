package br.com.caracameusonho.api.application.controller.auth;

import br.com.caracameusonho.api.application.dto.*;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import br.com.caracameusonho.api.domain.service.AuthorizationService;
import br.com.caracameusonho.api.domain.service.TokenService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	private final AuthenticationManager authenticationManager;
	private final UsuarioRepository usuarioRepository;
	private final TokenService tokenService;
	private final PasswordEncoder passwordEncoder;
	private final AuthorizationService authorizationService;


	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginDTO data) {

		logger.info("Tentativa de login para o email: [{}]. Senha recebida: [{}]", data.email(), data.senha());	

		var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
		var auth = this.authenticationManager.authenticate(usernamePassword);
		var usuarioPrincipal = (Usuario) auth.getPrincipal();
		var token = tokenService.generateToken(usuarioPrincipal);

		return ResponseEntity.ok(new LoginResponseDTO(token));
	}



	@PostMapping("/register")
	public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO data) {
		if (this.usuarioRepository.findByEmail(data.email()).isPresent()) {
			return ResponseEntity.badRequest().build();
		}
		String encryptedPassword = passwordEncoder.encode(data.senha());
		var newUser = Usuario.builder()
		.nome(data.nome())
		.email(data.email())
		.senha(encryptedPassword)
		.roles("ROLE_USER")
		.build();
		this.usuarioRepository.save(newUser);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestBody @Valid ForgotPasswordDTO forgotPasswordDTO) {
		try {
			authorizationService.generatePasswordResetToken(forgotPasswordDTO.email());
		} catch (UsernameNotFoundException e) { }
		return ResponseEntity.ok("Se um e-mail cadastrado for encontrado, um link para redefinição de senha será enviado.");
	}

	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordDTO resetPasswordDTO) {
		authorizationService.resetPassword(
			resetPasswordDTO.token(),
			resetPasswordDTO.newPassword(),
			resetPasswordDTO.confirmPassword()
		);
		return ResponseEntity.ok("Senha redefinida com sucesso!");
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(IllegalArgumentException.class)
	public String handleIllegalArgumentException(IllegalArgumentException ex) {
		return ex.getMessage();
	}

}
