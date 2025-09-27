package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.CreatePacoteDTO;
import br.com.caracameusonho.api.application.dto.DestinationsResponse;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import br.com.caracameusonho.api.domain.repository.ReservaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PacoteViagemService {

    private final PacoteViagemRepository pacoteViagemRepository;
	private final ReservaRepository reservaRepository; 	

    public DestinationsResponse findAllCategorized() {
        List<PacoteViagem> allPackages = pacoteViagemRepository.findAll();
        LocalDate today = LocalDate.now();

        List<PacoteViagem> upcoming = allPackages.stream()
                .filter(p -> !p.getDataPartida().isBefore(today))
                .collect(Collectors.toList());

        List<PacoteViagem> past = allPackages.stream()
                .filter(p -> p.getDataPartida().isBefore(today))
                .collect(Collectors.toList());

        return new DestinationsResponse(upcoming, past);
    }

  public PacoteViagem create(CreatePacoteDTO dto) {

    System.out.println("--- PACOTE VIAGEM SERVICE: Criando entidade a partir do DTO ---");
        System.out.println(dto.toString());

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

    System.out.println("--- PACOTE VIAGEM SERVICE: Entidade antes de salvar ---");
        System.out.println(novoPacote.toString());
        
        return pacoteViagemRepository.save(novoPacote);
    }

  public PacoteViagem findById(Long id) {
    return pacoteViagemRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Pacote de viagem não encontrado com o ID: " + id));
}


  public PacoteViagem update(Long id, CreatePacoteDTO dto) {
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
    public void deleteById(Long id) {
      if(!pacoteViagemRepository.existsById(id)) {
        throw new EntityNotFoundException("Pacote de viagem não encontrado com o ID: " + id);
      }
      reservaRepository.deleteByPacoteViagemId(id);
      pacoteViagemRepository.deleteById(id);
    }



}
