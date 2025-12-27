package br.com.caracameusonho.api.domain.integration.asaas;

import br.com.caracameusonho.api.domain.integration.asaas.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AsaasService {

    private final RestTemplate restTemplate;
    private final String apiUrl;
    private final String apiKey;

    public AsaasService(
            @Value("${asaas.api.url}") String apiUrl,
            @Value("${asaas.api.key}") String apiKey) {
        this.restTemplate = new RestTemplate();
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("access_token", apiKey);
        headers.set("Content-Type", "application/json");
        return headers;
    }

    public String criarCliente(AsaasClienteRequest request) {
        String url = apiUrl + "/customers";
        HttpEntity<AsaasClienteRequest> entity = new HttpEntity<>(request, getHeaders());

        ResponseEntity<AsaasClienteResponse> response = restTemplate.exchange(
            url, HttpMethod.POST, entity, AsaasClienteResponse.class
        );

        return response.getBody().id(); 
    }

    public AsaasCobrancaResponse gerarCobranca(AsaasCobrancaRequest request) {
        String url = apiUrl + "/payments";
        HttpEntity<AsaasCobrancaRequest> entity = new HttpEntity<>(request, getHeaders());

        ResponseEntity<AsaasCobrancaResponse> response = restTemplate.exchange(
            url, HttpMethod.POST, entity, AsaasCobrancaResponse.class
        );

        return response.getBody();
    }
}
