package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.integration.asaas.AsaasService;
import br.com.caracameusonho.api.domain.integration.asaas.dto.AsaasClienteRequest;
import br.com.caracameusonho.api.domain.integration.asaas.dto.AsaasCobrancaRequest;
import br.com.caracameusonho.api.domain.integration.asaas.dto.AsaasCobrancaResponse;
import br.com.caracameusonho.api.domain.model.PacoteViagem;
import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.repository.ReservaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final ReservaRepository reservaRepository;
    private final AsaasService asaasService;

    @Transactional
    public Reserva iniciarPagamento(Long reservaId, String formaPagamento) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada"));

        Usuario usuario = reserva.getUsuario();
        PacoteViagem pacote = reserva.getPacoteViagem();

        String customerId = reserva.getAsaasCustomerId();
        
        if (customerId == null) {
            AsaasClienteRequest clienteRequest = new AsaasClienteRequest(
                usuario.getNome(),
                usuario.getCpf() 
            );
            customerId = asaasService.criarCliente(clienteRequest);
            reserva.setAsaasCustomerId(customerId);
        }

        AsaasCobrancaRequest cobrancaRequest = new AsaasCobrancaRequest(
            customerId,
            formaPagamento, 
            pacote.getPreco(),
            LocalDate.now().plusDays(3), 
            "Pagamento Reserva: " + pacote.getTitulo(),
            reserva.getId().toString()
        );

        AsaasCobrancaResponse cobrancaResponse = asaasService.gerarCobranca(cobrancaRequest);

        reserva.setAsaasPaymentId(cobrancaResponse.id());
        reserva.setAsaasBoletoUrl(cobrancaResponse.bankSlipUrl()); 
        reserva.setUrlHotelVoucher(cobrancaResponse.invoiceUrl()); 
        
        return reservaRepository.save(reserva);
    }
}
