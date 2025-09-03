package com.caracameusonho.api.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
    @NotBlank
    @Size(max = 100)
    String nome,

    @NotBlank
    @Email
    String email,

    @NotBlank
    @Size(min = 6)
    String senha
) {}
