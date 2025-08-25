package com.caracameusonho.api.web.controller;
    
import com.caracameusonho.api.domain.service.JwtService;
import com.caracameusonho.api.web.dto.LoginRequestDTO;
import com.caracameusonho.api.web.dto.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.POST, RequestMethod.OPTIONS })
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);
        String token = jwtService.generateToken(auth);
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
