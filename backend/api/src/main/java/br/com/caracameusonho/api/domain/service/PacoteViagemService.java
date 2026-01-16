package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.application.dto.CreatePacoteDTO;
import br.com.caracameusonho.api.application.dto.PacoteViagemPublicDTO;
import br.com.caracameusonho.api.domain.model.FotoGaleria;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.repository.FotoGaleriaRepository;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PacoteViagemService {

    private final PacoteViagemRepository pacoteViagemRepository;
    private final FotoGaleriaRepository fotoGaleriaRepository;
    private final ImageUploadService imageUploadService;


    public List<PacoteViagem> listarTodos() {
        return pacoteViagemRepository.findAll();
    }
    
    public List<PacoteViagem> findAll() {
        return listarTodos();
    }

    public PacoteViagem buscarPorId(Long id) {
        return pacoteViagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pacote de viagem não encontrado com ID: " + id));
    }

    public List<PacoteViagemPublicDTO> findAllAsDto() {
        return listarTodos().stream()
                .map(PacoteViagemPublicDTO::new)
                .collect(Collectors.toList());
    }


    public PacoteViagem criarPacote(CreatePacoteDTO dados, MultipartFile foto) {
        String fotoUrl = imageUploadService.uploadImage(foto);
        
        PacoteViagem pacote = new PacoteViagem();
        pacote.setTitulo(dados.titulo());
        pacote.setDestino(dados.destino());
        pacote.setDescricao(dados.descricao());
        pacote.setPreco(dados.preco());
        pacote.setDuracaoDias(dados.duracaoDias());
        pacote.setDataPartida(dados.dataPartida());
        pacote.setVagasDisponiveis(dados.vagasDisponiveis());
        pacote.setFeatured(dados.featured());
        pacote.setUrlFotoPrincipal(fotoUrl);
        pacote.setDicasViagem(dados.dicasViagem());
        
        return pacoteViagemRepository.save(pacote);
    }

    public PacoteViagem atualizarPacote(Long id, CreatePacoteDTO dados, MultipartFile foto) {
        PacoteViagem pacote = buscarPorId(id);
        
        pacote.setTitulo(dados.titulo());
        pacote.setDestino(dados.destino());
        pacote.setDescricao(dados.descricao());
        pacote.setPreco(dados.preco());
        pacote.setDuracaoDias(dados.duracaoDias());
        pacote.setDataPartida(dados.dataPartida());
        pacote.setVagasDisponiveis(dados.vagasDisponiveis());
        pacote.setFeatured(dados.featured());
        pacote.setDicasViagem(dados.dicasViagem());

        if (foto != null && !foto.isEmpty()) {
            String fotoUrl = imageUploadService.uploadImage(foto);
            pacote.setUrlFotoPrincipal(fotoUrl);
        }
        
        return pacoteViagemRepository.save(pacote);
    }

    public void excluir(Long id) {
        pacoteViagemRepository.deleteById(id);
    }

    public FotoGaleria adicionarFotoGaleria(Long pacoteId, MultipartFile file) {
        PacoteViagem pacote = buscarPorId(pacoteId);
        String imageUrl = imageUploadService.uploadImage(file);
        
        FotoGaleria foto = new FotoGaleria();
        foto.setPacoteViagem(pacote);
        foto.setImageUrl(imageUrl);
        
        return fotoGaleriaRepository.save(foto);
    }

    @Transactional
    public void removerFotoGaleria(Long pacoteId, Long fotoId) {
        PacoteViagem pacote = buscarPorId(pacoteId);
        
        boolean removido = pacote.getGaleriaFotos().removeIf(foto -> foto.getId().equals(fotoId));
        
        if (!removido) {
            throw new RuntimeException("Foto não encontrada ou não pertence a este pacote.");
        }
        
        pacoteViagemRepository.save(pacote); 
    }


   }
