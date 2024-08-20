package com.example.project.dto;

public class BidDTO {
	
	private String farmerName;
	private String FarmerCity;
	private String amount;
	private String days;
	private String skills;
	private String experience;
	private String approachDetails;
	private String teamDetails;
	
	
	
	
	public BidDTO() {
		super();
	}


	public BidDTO(String farmerName, String farmerCity, String amount, String days, String skills, String experience,
			String approachDetails, String teamDetails) {
		super();
		this.farmerName = farmerName;
		FarmerCity = farmerCity;
		this.amount = amount;
		this.days = days;
		this.skills = skills;
		this.experience = experience;
		this.approachDetails = approachDetails;
		this.teamDetails = teamDetails;
	}


	public String getFarmerName() {
		return farmerName;
	}


	public void setFarmerName(String farmerName) {
		this.farmerName = farmerName;
	}


	public String getFarmerCity() {
		return FarmerCity;
	}


	public void setFarmerCity(String farmerCity) {
		FarmerCity = farmerCity;
	}


	public String getAmount() {
		return amount;
	}


	public void setAmount(String amount) {
		this.amount = amount;
	}


	public String getDays() {
		return days;
	}


	public void setDays(String days) {
		this.days = days;
	}


	public String getSkills() {
		return skills;
	}


	public void setSkills(String skills) {
		this.skills = skills;
	}


	public String getExperience() {
		return experience;
	}


	public void setExperience(String experience) {
		this.experience = experience;
	}


	public String getApproachDetails() {
		return approachDetails;
	}


	public void setApproachDetails(String approachDetails) {
		this.approachDetails = approachDetails;
	}


	public String getTeamDetails() {
		return teamDetails;
	}


	public void setTeamDetails(String teamDetails) {
		this.teamDetails = teamDetails;
	}
	
	
	
	
	
}
