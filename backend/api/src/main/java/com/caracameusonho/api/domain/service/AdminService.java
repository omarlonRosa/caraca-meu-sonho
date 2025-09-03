package com.caracameusonho.api.domain.service;

import com.caracameusonho.api.domain.model.Reserva;
import com.caracameusonho.api.domain.repository.ListaEsperaRepository;
import com.caracameusonho.api.domain.repository.PacoteViagemRepository;
import com.caracameusonho.api.domain.repository.ReservaRepository;
import com.caracameusonho.api.domain.repository.UsuarioRepository;
import com.caracameusonho.api.web.dto.FinanceiroMetricsDTO;
import com.caracameusonho.api.web.dto.MetricsDTO;
import com.caracameusonho.api.web.dto.ReservaDetalhesDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private ListaEsperaRepository listaEsperaRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacoteViagemRepository pacoteViagemRepository;
    

    public MetricsDTO getDashboardMetrics() {
        long totalInscritosListaEspera = listaEsperaRepository.count();
        long totalReservas = reservaRepository.count();
        long totalUsuarios = usuarioRepository.count();
        long totalPacotes = pacoteViagemRepository.count();

        return new MetricsDTO(totalInscritosListaEspera, totalReservas, totalUsuarios, totalPacotes);
    }

  public FinanceiroMetricsDTO getFinanceiroMetrics() {
        // Obter todas as reservas com status 'PAGO'
        List<Reserva> reservasPagas = reservaRepository.findByStatus("PAGO");
        
        // Calcular o total faturado
        BigDecimal totalFaturado = reservasPagas.stream()
                .map(reserva -> BigDecimal.valueOf(reserva.getValorTotal()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Obter as 10 últimas reservas pagas para a lista
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("dataReserva").descending());
        List<Reserva> ultimasReservas = reservaRepository.findByStatus("PAGO", pageRequest).getContent();

        List<ReservaDetalhesDTO> ultimasReservasDTO = ultimasReservas.stream()
                .map(reserva -> new ReservaDetalhesDTO(
                        reserva.getUsuario().getNome(),
                        reserva.getPacoteViagem().getTitulo(),
                        BigDecimal.valueOf(reserva.getValorTotal()),
                        reserva.getDataReserva(),
                        reserva.getStatus()
                ))
                .collect(Collectors.toList());

        return new FinanceiroMetricsDTO(
            totalFaturado,
            reservasPagas.size(),
            ultimasReservasDTO
        );
    }
}
