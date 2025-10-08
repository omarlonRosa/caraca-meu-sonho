package br.com.caracameusonho.api.application.dto;

import org.hibernate.validator.constraints.NotBlank;

import jakarta.validation.constraints.Email;

public record UserAdminUpdateDTO(
	@NotBlank String nome,
	@NotBlank @Email String email,
	@NotBlank String roles
) {
}
