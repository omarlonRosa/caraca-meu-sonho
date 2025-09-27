
package br.com.caracameusonho.api.domain.service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.caracameusonho.api.application.dto.DashboardMetricsDTO;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import br.com.caracameusonho.api.domain.repository.UsuarioRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DashboardService {

  private final PacoteViagemRepository pacoteViagemRepository;
  private final UsuarioRepository usuarioRepository;

  public DashboardMetricsDTO getMetrics() {
    long totalPacotes = pacoteViagemRepository.count();
    long totalUsuarios = usuarioRepository.count();

    Optional<PacoteViagem> proximaViagemOpt = pacoteViagemRepository.findAll().stream()
            .filter(p -> p.getDataPartida().isAfter(LocalDate.now()))
            .min(Comparator.comparing(PacoteViagem::getDataPartida));

    String proximaViagemTitulo = proximaViagemOpt.map(PacoteViagem::getTitulo).orElse("Nenhuma viagem futura agendada");
    LocalDate proximaViagemData = proximaViagemOpt.map(PacoteViagem::getDataPartida).orElse(null);
    return new DashboardMetricsDTO(totalPacotes, totalUsuarios, proximaViagemTitulo, proximaViagemData);

  }
  
}
