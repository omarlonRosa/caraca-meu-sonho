package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.domain.model.Reserva;
import br.com.caracameusonho.api.domain.service.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    public record IniciarPagamentoDTO(Long reservaId, String formaPagamento) {}
    
    public record PagamentoResponseDTO(String linkPagamento, String linkBoletoPdf) {}

    @PostMapping("/iniciar")
    public ResponseEntity<PagamentoResponseDTO> iniciarPagamento(@RequestBody IniciarPagamentoDTO dados) {
        
        Reserva reservaAtualizada = paymentService.iniciarPagamento(dados.reservaId(), dados.formaPagamento());

        return ResponseEntity.ok(new PagamentoResponseDTO(
            reservaAtualizada.getUrlHotelVoucher(), 
            reservaAtualizada.getAsaasBoletoUrl()
        ));
    }
}
