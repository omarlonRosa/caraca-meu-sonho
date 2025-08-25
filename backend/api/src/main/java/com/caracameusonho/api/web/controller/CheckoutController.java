package com.caracameusonho.api.web.controller;

import com.caracameusonho.api.domain.service.StripeCheckoutService;
import com.caracameusonho.api.web.dto.CheckoutRequestDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/checkout")
@CrossOrigin(origins = " https://5a1bc1c67e1f.ngrok-free.app -> http://localhost:5173", methods = { RequestMethod.POST, RequestMethod.OPTIONS })
public class CheckoutController {

    @Autowired
    private StripeCheckoutService checkoutService;

    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody CheckoutRequestDTO request) throws StripeException {
        Session session = checkoutService.createCheckoutSession(request.pacoteId());
        return ResponseEntity.ok(Map.of("sessionId", session.getId()));
    }
}
