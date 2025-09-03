package com.caracameusonho.api.web.controller;
    
import com.caracameusonho.api.domain.service.JwtService;
import com.caracameusonho.api.domain.service.RegisterService;
import com.caracameusonho.api.web.dto.LoginRequestDTO;
import com.caracameusonho.api.web.dto.LoginResponseDTO;
import com.caracameusonho.api.web.dto.RegisterRequestDTO;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.POST, RequestMethod.OPTIONS })
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

  @Autowired
    private RegisterService registerService;


   @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);
        String token = jwtService.generateToken(auth);
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }


  @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequestDTO data) {
        if (registerService.registerNewUser(data).isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário com este e-mail já existe.");
        }
    }

   }
