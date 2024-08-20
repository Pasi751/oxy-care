package com.example.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.model.Admin;
import com.example.project.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public String registerAdmin(Admin admin) {
        if (adminRepository.existsByUsername(admin.getUsername())) {
            return "Username already exists";
        }
        adminRepository.save(admin);
        return "Admin registered successfully";
    }

    public String loginAdmin(Admin admin) {
        Admin existingAdmin = adminRepository.findByUsernameAndPassword(admin.getUsername(), admin.getPassword());
        if (existingAdmin != null) {
            return "Admin logged in successfully";
        } else {
            return "Invalid username or password";
        }
    }
}
