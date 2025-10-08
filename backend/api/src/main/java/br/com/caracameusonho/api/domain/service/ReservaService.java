package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.ReservaAdminViewDTO;
import br.com.caracameusonho.api.application.dto.ReservaDTO;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import br.com.caracameusonho.api.domain.repository.ReservaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final PacoteViagemRepository pacoteViagemRepository;
    private final EmailService emailService;

    public Reserva createPendingReserva(Long pacoteId, Usuario usuario) {
        PacoteViagem pacote = pacoteViagemRepository.findById(pacoteId)
                .orElseThrow(() -> new EntityNotFoundException("Pacote de viagem não encontrado"));

        Reserva novaReserva = new Reserva();
        novaReserva.setPacoteViagem(pacote);
        novaReserva.setUsuario(usuario);
        novaReserva.setDataReserva(LocalDateTime.now());
        novaReserva.setStatus("PENDENTE");

        return reservaRepository.save(novaReserva);
    }

	public List<ReservaAdminViewDTO> findAllForAdmin() {
        return reservaRepository.findAll()
                .stream()
                .map(ReservaAdminViewDTO::new) 
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservaAdminViewDTO updateStatus(Long reservaId, String newStatus) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada com o ID: " + reservaId));
        
        reserva.setStatus(newStatus);
        
        Reserva reservaAtualizada = reservaRepository.save(reserva);
        return new ReservaAdminViewDTO(reservaAtualizada);
    }


    public void confirmarReserva(Long reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada com o ID: " + reservaId));

        if ("PENDENTE".equals(reserva.getStatus())) {
            reserva.setStatus("CONFIRMADA");
            Reserva reservaSalva = reservaRepository.save(reserva);
            emailService.sendBookingConfirmationEmail(reservaSalva);
        } else {
            System.out.println("ℹ️ Reserva ID " + reservaId + " já foi processada. Status atual: " + reserva.getStatus());
        }
    }


	public List<ReservaDTO> findByUsuarioAsDto(Usuario usuario) {
        return reservaRepository.findByUsuario(usuario)
            .stream()
            .map(ReservaDTO::new)
            .collect(Collectors.toList());
    }
}
