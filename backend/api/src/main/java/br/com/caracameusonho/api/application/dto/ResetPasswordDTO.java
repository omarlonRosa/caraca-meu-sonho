package br.com.caracameusonho.api.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ResetPasswordDTO(
    @NotBlank(message = "O token é obrigatório.")
    String token,

    @NotBlank(message = "A nova senha não pode ser vazia.")
	@Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        message = "A nova senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)."
    )
    String newPassword,

    @NotBlank(message = "A confirmação da senha não pode ser vazia.")
    String confirmPassword
) {
}
