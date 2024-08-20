package com.example.project.dto;

public class BidDTO2 {
	
	
	private String bidId;
	private String industrialistName;
	private String companyName;
	private String proposalTitle;
	private String status;
	private String amount;
	private String days;
	private String skills;
	private String experience;
	private String approachDetails;
	private String teamDetails;
	
	
	
	
	public BidDTO2() {
		super();
	}


	public BidDTO2(String industrialistName, String companyName, String status, String amount, String days, String skills, String experience,
			String approachDetails, String teamDetails,String proposalTitle) {
		super();
		this.industrialistName = industrialistName;
		this.companyName = companyName;
		this.status = status;
		this.amount = amount;
		this.days = days;
		this.skills = skills;
		this.experience = experience;
		this.approachDetails = approachDetails;
		this.teamDetails = teamDetails;
		this.proposalTitle = proposalTitle;
	}
	
	

	public String getBidId() {
		return bidId;
	}


	public void setBidId(String bidId) {
		this.bidId = bidId;
	}


	public String getIndustrialistName() {
		return industrialistName;
	}


	public void setIndustrialistName(String industrialistName) {
		this.industrialistName = industrialistName;
	}


	public String getCompanyName() {
		return companyName;
	}


	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}



	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
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


	public String getProposalTitle() {
		return proposalTitle;
	}


	public void setProposalTitle(String proposalTitle) {
		this.proposalTitle = proposalTitle;
	}
	
	public void setStatus(Boolean status) {
	    if (status == null) {
	        this.status = "Pending";
	    } else {
	        this.status = status ? "Accepted" : "Rejected";
	    }
	}

	
	
}
