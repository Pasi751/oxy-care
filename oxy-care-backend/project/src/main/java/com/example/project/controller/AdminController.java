package com.example.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.model.Admin;
import com.example.project.service.AdminService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        String message = adminService.registerAdmin(admin);
        if (message.equals("Admin registered successfully")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
        String message = adminService.loginAdmin(admin);
        if (message.equals("Admin logged in successfully")) {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
        }
    }
}

