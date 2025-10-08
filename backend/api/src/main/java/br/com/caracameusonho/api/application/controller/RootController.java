package br.com.caracameusonho.api.application.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RootController {

    @GetMapping
    public String root() {
        return "Welcome to Caraca, Meu Sonho API! The API is running correctly.";
    }
}
