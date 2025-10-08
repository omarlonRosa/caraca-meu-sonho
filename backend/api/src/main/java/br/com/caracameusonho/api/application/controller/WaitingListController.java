package br.com.caracameusonho.api.application.controller;

import br.com.caracameusonho.api.application.dto.JoinWaitingListRequestDTO;
import br.com.caracameusonho.api.application.dto.WaitingListEntryDTO;
import br.com.caracameusonho.api.domain.model.Usuario;
import br.com.caracameusonho.api.domain.service.WaitingListService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/me/waiting-list")
@AllArgsConstructor
public class WaitingListController {

    private final WaitingListService waitingListService;

    @PostMapping
    public ResponseEntity<WaitingListEntryDTO> join(
            @RequestBody @Valid JoinWaitingListRequestDTO request,
            @AuthenticationPrincipal Usuario usuario) {
        
        WaitingListEntryDTO newEntryDto = waitingListService.joinWaitingList(usuario.getId(), request.pacoteId());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(newEntryDto);
    }
}
