package br.com.caracameusonho.api.domain.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@AllArgsConstructor
public class ImageUploadService {

    private final Cloudinary cloudinary;

    public String uploadImageFromUrl(String imageUrl) {
        try {
            Map uploadResult = cloudinary.uploader().upload(imageUrl, ObjectUtils.emptyMap());

            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Erro ao fazer upload da imagem: " + e.getMessage());
        }
    }

	 public String upload(MultipartFile file, String resourceType) {
        try {
            Map<String, Object> options = ObjectUtils.asMap("resource_type", resourceType);

            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

            return uploadResult.get("secure_url").toString();
            
        } catch (IOException e) {
            throw new RuntimeException("Erro ao fazer upload do arquivo: " + e.getMessage());
        }
    }

        }

