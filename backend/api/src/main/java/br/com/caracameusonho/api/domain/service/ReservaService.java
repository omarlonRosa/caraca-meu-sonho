package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.ReservaAdminViewDTO;
import br.com.caracameusonho.api.application.dto.ReservaDTO;
import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.repository.ReservaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public List<ReservaAdminViewDTO> findAllForAdmin() {
        return reservaRepository.findAll().stream()
                .map(ReservaAdminViewDTO::new) // Usa o construtor que criamos no Record
                .collect(Collectors.toList());
    }

    public List<ReservaDTO> buscarPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId).stream()
                .map(ReservaDTO::new)
                .collect(Collectors.toList());
    }

    // 3. Atualizar Status
    @Transactional
    public ReservaAdminViewDTO updateStatus(Long id, String newStatus) {
        Reserva reserva = findById(id);
        reserva.setStatus(newStatus);
        reservaRepository.save(reserva);
        return new ReservaAdminViewDTO(reserva);
    }

    @Transactional
    public Reserva atualizarDocumentos(Long id, String passagem, String hotel, String seguro, List<String> outros) {
        Reserva reserva = findById(id);
        
        reserva.setUrlPassagem(passagem);
        reserva.setUrlHotelVoucher(hotel);
        reserva.setUrlSeguroViagem(seguro);
        
        if (reserva.getUrlsOutros() != null) {
            reserva.getUrlsOutros().clear();
        }
        if (outros != null) {
            reserva.getUrlsOutros().addAll(outros);
        }
        
        return reservaRepository.save(reserva);
    }

    public Reserva findById(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada com ID: " + id));
    }
}
