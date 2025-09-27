package br.com.caracameusonho.api.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordDTO(
    @NotBlank(message = "O e-mail não pode ser vazio.")
    @Email(message = "Formato de e-mail inválido.")
    String email
) {}
