package com.example.project.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.example.project.model.Admin;
import com.example.project.repository.AdminRepository;

@Component
public class AdminDataLoader implements ApplicationRunner {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminDataLoader(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Check if admin with username 'admin' already exists
        if (adminRepository.findByUsername("admin") == null) {
            // Create a new admin with default username and password
            Admin admin = new Admin("admin", "orcms123$");
            adminRepository.save(admin);
        }
    }
}
