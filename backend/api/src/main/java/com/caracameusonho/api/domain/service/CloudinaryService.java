// src/main/java/br/com/caracameusonho/api/domain/service/CloudinaryService.java

package com.caracameusonho.api.domain.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    @Value("${cloudinary.cloud_name}")
    private String cloudName;
    @Value("${cloudinary.api_key}")
    private String apiKey;
    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    // Este é o método que o seu UploadController está procurando
    public Map<String, Object> getUploadSignature() {
        
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", this.cloudName,
            "api_key", this.apiKey,
            "api_secret", this.apiSecret
        ));
        
        long timestamp = System.currentTimeMillis() / 1000L;
        
        Map<String, Object> paramsToSign = ObjectUtils.asMap("timestamp", timestamp);
        
        String signature = cloudinary.apiSignRequest(paramsToSign, this.apiSecret);
        
        Map<String, Object> result = new HashMap<>();
        result.put("signature", signature);
        result.put("timestamp", timestamp);
        result.put("api_key", apiKey);
        result.put("cloud_name", cloudName);
        
        return result;
    }
}
