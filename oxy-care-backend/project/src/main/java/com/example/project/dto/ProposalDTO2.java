package com.example.project.dto;

public class ProposalDTO2 {
    private Long id;
    private String proposalTitle;
    private String estimatedCarbonEmission;
    private String mainEmissionSource;
    private String additionalDetails;
    private String bidSubmissionDeadline;
    private String farmerUsername;
    private String farmerCity;
    private String farmerProvince;
    private Boolean isCompleted;
    
    public ProposalDTO2() {
    	
    }

	public ProposalDTO2(Long id, String proposalTitle, String estimatedCarbonEmission, String mainEmissionSource,
			String additionalDetails, String bidSubmissionDeadline, String farmerUsername, String farmerCity,
			String farmerProvince) {
		super();
		this.id = id;
		this.proposalTitle = proposalTitle;
		this.estimatedCarbonEmission = estimatedCarbonEmission;
		this.mainEmissionSource = mainEmissionSource;
		this.additionalDetails = additionalDetails;
		this.bidSubmissionDeadline = bidSubmissionDeadline;
		this.farmerUsername = farmerUsername;
		this.farmerCity = farmerCity;
		this.farmerProvince = farmerProvince;
	}
	
	 // getters and setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProposalTitle() {
		return proposalTitle;
	}

	public void setProposalTitle(String proposalTitle) {
		this.proposalTitle = proposalTitle;
	}

	public String getEstimatedCarbonEmission() {
		return estimatedCarbonEmission;
	}

	public void setEstimatedCarbonEmission(String estimatedCarbonEmission) {
		this.estimatedCarbonEmission = estimatedCarbonEmission;
	}

	public String getMainEmissionSource() {
		return mainEmissionSource;
	}

	public void setMainEmissionSource(String mainEmissionSource) {
		this.mainEmissionSource = mainEmissionSource;
	}

	public String getAdditionalDetails() {
		return additionalDetails;
	}

	public void setAdditionalDetails(String additionalDetails) {
		this.additionalDetails = additionalDetails;
	}

	public String getBidSubmissionDeadline() {
		return bidSubmissionDeadline;
	}

	public void setBidSubmissionDeadline(String bidSubmissionDeadline) {
		this.bidSubmissionDeadline = bidSubmissionDeadline;
	}

	public String getFarmerUsername() {
		return farmerUsername;
	}

	public void setFarmerUsername(String farmerUsername) {
		this.farmerUsername = farmerUsername;
	}

	public String getFarmerCity() {
		return farmerCity;
	}

	public void setFarmerCity(String farmerCity) {
		this.farmerCity = farmerCity;
	}

	public String getFarmerProvince() {
		return farmerProvince;
	}

	public void setFarmerProvince(String farmerProvince) {
		this.farmerProvince = farmerProvince;
	}

	public Boolean getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(Boolean isCompleted) {
		this.isCompleted = isCompleted;
	}
    
    
    
   
	
}
