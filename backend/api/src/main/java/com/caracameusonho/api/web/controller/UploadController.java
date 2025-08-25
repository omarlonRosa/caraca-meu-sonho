package com.caracameusonho.api.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.caracameusonho.api.domain.service.CloudinaryService;

@RestController
@RequestMapping("/admin/uploads")
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class UploadController {

  @Autowired
  private CloudinaryService cloudinaryService;

  @GetMapping("/signature")
  public Map<String, Object> getSignature() {
    return cloudinaryService.getUploadSignature();
  }
  
}
