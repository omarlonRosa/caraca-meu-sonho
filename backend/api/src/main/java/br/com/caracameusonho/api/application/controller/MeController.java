package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.application.dto.CreateReservaDTO;
import br.com.caracameusonho.api.application.dto.ReservaDTO;
import br.com.caracameusonho.api.application.dto.UpdateProfileDTO;
import br.com.caracameusonho.api.domain.model.FotoGaleria;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.ReservaRepository;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import br.com.caracameusonho.api.domain.service.PacoteViagemService;
import br.com.caracameusonho.api.domain.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MeController {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReservaService reservaService; 
    private final PacoteViagemService pacoteViagemService; 

    @GetMapping("/reservas")
    public ResponseEntity<List<ReservaDTO>> minhasReservas() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<ReservaDTO> listaReservas = reservaService.buscarPorUsuario(usuario.getId());
                
        return ResponseEntity.ok(listaReservas);
    }

    @PostMapping("/reservas")
    @Transactional
    public ResponseEntity<ReservaDTO> criarReserva(@RequestBody CreateReservaDTO dados) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        PacoteViagem pacote = pacoteViagemService.buscarPorId(dados.pacoteId());

        Reserva novaReserva = new Reserva();
        novaReserva.setUsuario(usuario);
        novaReserva.setPacoteViagem(pacote);
        novaReserva.setDataReserva(LocalDateTime.now());
        novaReserva.setStatus("PENDENTE");

        reservaRepository.save(novaReserva);

        return ResponseEntity.ok(new ReservaDTO(novaReserva));
    }

    @PutMapping("/profile")
    @Transactional
    public ResponseEntity<Void> atualizarPerfil(@RequestBody UpdateProfileDTO dados) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (dados.cpf() != null && !dados.cpf().isBlank()) {
            usuario.setCpf(dados.cpf());
        }
        
        usuarioRepository.save(usuario);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/pacotes/{pacoteId}/galeria")
    public ResponseEntity<List<FotoGaleria>> getGaleria(@PathVariable Long pacoteId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        
        PacoteViagem pacote = pacoteViagemService.buscarPorId(pacoteId);
        return ResponseEntity.ok(pacote.getGaleriaFotos());
    }
}
