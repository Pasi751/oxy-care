package com.example.project.dto;

public class UpdateUserNameDTO {
	
	private String currentUsername;
	
	
	private String newUsername;


	public UpdateUserNameDTO(String currentUsername, String newUsername) {
		super();
		this.currentUsername = currentUsername;
		this.newUsername = newUsername;
	}


	public String getCurrentUsername() {
		return currentUsername;
	}


	public void setCurrentUsername(String currentUsername) {
		this.currentUsername = currentUsername;
	}


	public String getNewUsername() {
		return newUsername;
	}


	public void setNewUsername(String newUsername) {
		this.newUsername = newUsername;
	}
	
	
	 

}
