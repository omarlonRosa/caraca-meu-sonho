package br.com.caracameusonho.api.application.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.caracameusonho.api.domain.service.ImageUploadService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/uploads")
@AllArgsConstructor
public class ImageUploadController {


    private final ImageUploadService imageUploadService;

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = imageUploadService.upload(file);

        Map<String, String> response = Map.of("imageUrl", imageUrl);


        return ResponseEntity.ok(response);
    }
    
}
