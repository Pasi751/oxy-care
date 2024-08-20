package com.example.project.dto;

public class LoginResponseDTO {
    private String username;
    private String userRole;
    private Boolean isEnabled;
    
    public LoginResponseDTO() {}
    
	public LoginResponseDTO(String username, String userRole) {
		super();
		this.username = username;
		this.userRole = userRole;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
	
	
    
}
