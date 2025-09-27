package br.com.caracameusonho.api.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordDTO(
    @NotBlank(message = "O token é obrigatório.")
    String token,

    @NotBlank(message = "A nova senha não pode ser vazia.")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres.")
    String newPassword,

    @NotBlank(message = "A confirmação da senha não pode ser vazia.")
    String confirmPassword
) {
}
