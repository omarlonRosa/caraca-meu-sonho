package br.com.caracameusonho.api.application.dto;

import br.com.caracameusonho.api.domain.model.PacoteViagem;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DestinationsResponse {
    private List<PacoteViagem> upcoming;
    private List<PacoteViagem> past;
}
