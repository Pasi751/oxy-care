package com.example.project.model;

import jakarta.persistence.Entity;

@Entity
public class Explorer extends User {
	
	
	private String contactNumber;

    public Explorer() {
    }

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
    
    

    
}
