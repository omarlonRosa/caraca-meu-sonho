package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.WaitingListEntry;
import java.time.LocalDateTime;

public record WaitingListEntryDTO(
    Long id,
    Long pacoteId,
    String pacoteTitulo,
    LocalDateTime createdAt
) {
    public WaitingListEntryDTO(WaitingListEntry entry) {
        this(
            entry.getId(),
            entry.getPacoteViagem().getId(),
            entry.getPacoteViagem().getTitulo(),
            entry.getCreatedAt()
        );
    }
}
