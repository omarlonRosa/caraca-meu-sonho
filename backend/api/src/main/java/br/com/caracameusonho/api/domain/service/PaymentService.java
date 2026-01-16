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
        System.out.println(">>> Iniciando pagamento para reserva ID: " + reservaId);

        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada"));

        Usuario usuario = reserva.getUsuario();
        PacoteViagem pacote = reserva.getPacoteViagem();
        
        System.out.println(">>> Usuário: " + usuario.getNome() + " | CPF: " + usuario.getCpf());

        try {
            String customerId = reserva.getAsaasCustomerId();
            
            if (customerId == null) {
                System.out.println(">>> Criando cliente no Asaas...");
                if (usuario.getCpf() == null || usuario.getCpf().isEmpty()) {
                    throw new RuntimeException("O usuário não tem CPF cadastrado. Atualize o perfil.");
                }

                AsaasClienteRequest clienteRequest = new AsaasClienteRequest(
                    usuario.getNome(),
                    usuario.getCpf() 
                );
                customerId = asaasService.criarCliente(clienteRequest);
                reserva.setAsaasCustomerId(customerId);
                System.out.println(">>> Cliente criado com ID: " + customerId);
            }

           System.out.println(">>> Gerando cobrança de R$ " + pacote.getPreco());
            
            AsaasCobrancaRequest cobrancaRequest = new AsaasCobrancaRequest(
                customerId,
                formaPagamento, 
                pacote.getPreco(),
                LocalDate.now().plusDays(3), 
                "Pagamento Reserva: " + pacote.getTitulo(),
                reserva.getId().toString()
            );


            AsaasCobrancaResponse cobrancaResponse = asaasService.gerarCobranca(cobrancaRequest);
            System.out.println(">>> Cobrança gerada com sucesso! URL: " + cobrancaResponse.invoiceUrl());

            reserva.setAsaasPaymentId(cobrancaResponse.id());
            reserva.setAsaasBoletoUrl(cobrancaResponse.bankSlipUrl()); 
            reserva.setAsaasInvoiceUrl(cobrancaResponse.invoiceUrl()); 
            
            return reservaRepository.save(reserva);

        } catch (Exception e) {
            System.err.println("!!! ERRO NO ASAAS !!!");
            e.printStackTrace(); // Isto vai imprimir o erro exato no terminal
            throw new RuntimeException("Erro ao comunicar com Asaas: " + e.getMessage());
        }
    }
}
