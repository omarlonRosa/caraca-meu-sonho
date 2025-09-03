package com.caracameusonho.api.web.controller;

import com.caracameusonho.api.domain.service.AdminService;
import com.caracameusonho.api.web.dto.FinanceiroMetricsDTO;
import com.caracameusonho.api.web.dto.MetricsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard/metrics")
    public ResponseEntity<MetricsDTO> getDashboardMetrics() {
        MetricsDTO metrics = adminService.getDashboardMetrics();
        return ResponseEntity.ok(metrics);
    }

  @GetMapping("/dashboard/financeiro")
    public ResponseEntity<FinanceiroMetricsDTO> getFinanceiroMetrics() {
        FinanceiroMetricsDTO metrics = adminService.getFinanceiroMetrics();
        return ResponseEntity.ok(metrics);
    }
}
