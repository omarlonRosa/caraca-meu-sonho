package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.*;
import br.com.caracameusonho.api.domain.model.FotoGaleria;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.FotoGaleriaRepository;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import br.com.caracameusonho.api.domain.repository.ReservaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PacoteViagemService {

    private final PacoteViagemRepository pacoteViagemRepository;
    private final ImageUploadService imageUploadService;
    private final ReservaRepository reservaRepository;
    private final FotoGaleriaRepository fotoGaleriaRepository;

    // --- MÉTODOS PÚBLICOS QUE RETORNAM DTOs ---

    public DestinationsResponseDTO findAllCategorized() {
        List<PacoteViagem> allPackages = pacoteViagemRepository.findAll();
        LocalDate today = LocalDate.now();

        List<PacoteViagemDTO> upcoming = allPackages.stream()
                .filter(p -> !p.getDataPartida().isBefore(today))
                .map(this::convertToPacoteViagemDto)
                .collect(Collectors.toList());

        List<PacoteViagemDTO> past = allPackages.stream()
                .filter(p -> p.getDataPartida().isBefore(today))
                .map(this::convertToPacoteViagemDto)
                .collect(Collectors.toList());

        return new DestinationsResponseDTO(upcoming, past);
    }

    public List<PacoteViagemDTO> findAllAsDto() {
        return pacoteViagemRepository.findAll()
                .stream()
                .map(this::convertToPacoteViagemDto)
                .collect(Collectors.toList());
    }

    public PacoteViagemDTO findByIdAsDto(Long id) {
        PacoteViagem pacote = findById(id);
        return convertToPacoteViagemDto(pacote);
    }
    
    @Transactional(readOnly = true)
    public PacoteViagemAdminDTO findByIdForAdmin(Long id) {
        PacoteViagem pacote = findById(id);
        return new PacoteViagemAdminDTO(pacote);
    }

    public PacoteViagemDTO createAndReturnDto(CreatePacoteDTO dto) {
        PacoteViagem novoPacote = create(dto);
        return convertToPacoteViagemDto(novoPacote);
    }

    public PacoteViagemDTO updateAndReturnDto(Long id, CreatePacoteDTO dto) {
        PacoteViagem pacoteAtualizado = update(id, dto);
        return convertToPacoteViagemDto(pacoteAtualizado);
    }

    public PacoteViagemDTO addFotosAGaleriaAsDto(Long pacoteId, List<MultipartFile> files) {
        PacoteViagem pacoteAtualizado = addFotosAGaleria(pacoteId, files);
        return convertToPacoteViagemDto(pacoteAtualizado);
    }
    
    @Transactional
    public void deleteById(Long id) {
        if (!pacoteViagemRepository.existsById(id)) {
            throw new EntityNotFoundException("Pacote de viagem não encontrado com o ID: " + id);
        }
        reservaRepository.deleteByPacoteViagemId(id);
        pacoteViagemRepository.deleteById(id);
    }

    public List<FotoGaleria> getGaleriaParaUsuario(Long pacoteId, Usuario usuarioLogado) {
        boolean hasConfirmedReservation = reservaRepository.existsByPacoteViagemIdAndUsuarioAndStatus(pacoteId, usuarioLogado, "CONFIRMADA");
        boolean hasCompletedReservation = reservaRepository.existsByPacoteViagemIdAndUsuarioAndStatus(pacoteId, usuarioLogado, "REALIZADA");

        if (!hasConfirmedReservation && !hasCompletedReservation) {
            throw new AccessDeniedException("O usuário não tem permissão para acessar esta galeria.");
        }

        PacoteViagem pacote = findById(pacoteId); // Correção do erro 'cannot find symbol: variable id'
        return pacote.getGaleriaFotos();
    }

    // --- MÉTODOS PRIVADOS DE LÓGICA INTERNA ---

    private PacoteViagem findById(Long id) {
        return pacoteViagemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pacote de viagem não encontrado com o ID: " + id));
    }

    private PacoteViagem create(CreatePacoteDTO dto) {
        PacoteViagem novoPacote = new PacoteViagem();
        novoPacote.setTitulo(dto.titulo());
        novoPacote.setDestino(dto.destino());
        novoPacote.setDescricao(dto.descricao());
        novoPacote.setDataPartida(dto.dataPartida());
        novoPacote.setDuracaoDias(dto.duracaoDias());
        novoPacote.setPreco(dto.preco());
        novoPacote.setVagasDisponiveis(dto.vagasDisponiveis());
        novoPacote.setUrlFotoPrincipal(dto.urlFotoPrincipal());
        novoPacote.setFeatured(dto.featured());
        return pacoteViagemRepository.save(novoPacote);
    }

    private PacoteViagem update(Long id, CreatePacoteDTO dto) {
        PacoteViagem pacoteExistente = findById(id);
        pacoteExistente.setTitulo(dto.titulo());
        pacoteExistente.setDestino(dto.destino());
        pacoteExistente.setDescricao(dto.descricao());
        pacoteExistente.setDataPartida(dto.dataPartida());
        pacoteExistente.setDuracaoDias(dto.duracaoDias());
        pacoteExistente.setPreco(dto.preco());
        pacoteExistente.setVagasDisponiveis(dto.vagasDisponiveis());
        pacoteExistente.setUrlFotoPrincipal(dto.urlFotoPrincipal());
        pacoteExistente.setFeatured(dto.featured());
        return pacoteViagemRepository.save(pacoteExistente);
    }
    
    @Transactional
    private PacoteViagem addFotosAGaleria(Long pacoteId, List<MultipartFile> files) {
        PacoteViagem pacote = findById(pacoteId);
        for (MultipartFile file : files) {
            String imageUrl = imageUploadService.upload(file, "image");
            FotoGaleria novaFoto = new FotoGaleria();
            novaFoto.setImageUrl(imageUrl);
            novaFoto.setPacoteViagem(pacote);
            pacote.getGaleriaFotos().add(novaFoto);
        }
        return pacoteViagemRepository.save(pacote);
    }

    /**
     * Este é o nosso único e correto método para converter PacoteViagem em PacoteViagemDTO.
     */
    private PacoteViagemDTO convertToPacoteViagemDto(PacoteViagem pacote) {
        List<ReservaDTO> reservaDTOs = pacote.getReservas().stream()
                .map(reserva -> {
                    UsuarioDTO usuarioDTO = new UsuarioDTO(
                            reserva.getUsuario().getId(),
                            reserva.getUsuario().getNome(),
                            reserva.getUsuario().getEmail());
                    return new ReservaDTO(
                            reserva.getId(),
							reserva.getPacoteViagem().getId(),
                            reserva.getDataReserva(),
                            reserva.getStatus(),
                            usuarioDTO);
                })
                .collect(Collectors.toList());

        return new PacoteViagemDTO(
                pacote.getId(),
                pacote.getTitulo(),
                pacote.getDestino(),
                pacote.getDescricao(),
                pacote.getDataPartida(),
                pacote.getDuracaoDias(),
                pacote.getPreco(),
                pacote.getVagasDisponiveis(),
                pacote.getUrlFotoPrincipal(),
                pacote.isFeatured(),
                reservaDTOs);
    }
}
