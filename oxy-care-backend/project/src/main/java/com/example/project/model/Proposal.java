package com.example.project.model;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Proposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String proposalTitle;
    private String companyName;
    private String industryType;
    private Double estimatedCarbonEmission;
    private String mainEmissionSource;
    private String additionalDetails;
    private Date bidSubmissionDeadline;
    private Double rewardOffered;
    private boolean isVisibleToAll;
    
    
    

    @ManyToOne
    private Industrialist industrialist;

//    @ManyToMany(mappedBy = "biddedProposals")
//    private Set<Agriculturist> biddedAgriculturists;

    @OneToOne
    private Agriculturist acceptedFarmer;
    
    @OneToMany(mappedBy = "proposal")
    private Set<Bid> bids;
    
    @OneToOne(mappedBy = "proposal")
    private IndustrialistProposalRequest industrialistProposalRequest;
    
    public Proposal() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getIndustryType() {
		return industryType;
	}

	public void setIndustryType(String industryType) {
		this.industryType = industryType;
	}

	public Double getEstimatedCarbonEmission() {
		return estimatedCarbonEmission;
	}

	public void setEstimatedCarbonEmission(Double estimatedCarbonEmission) {
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

	public Date getBidSubmissionDeadline() {
		return bidSubmissionDeadline;
	}

	public void setBidSubmissionDeadline(Date bidSubmissionDeadline) {
		this.bidSubmissionDeadline = bidSubmissionDeadline;
	}

	public Double getRewardOffered() {
		return rewardOffered;
	}

	public void setRewardOffered(Double rewardOffered) {
		this.rewardOffered = rewardOffered;
	}

	public Industrialist getIndustrialist() {
		return industrialist;
	}

	public void setIndustrialist(Industrialist industrialist) {
		this.industrialist = industrialist;
	}

//	public Set<Agriculturist> getBiddedAgriculturists() {
//		return biddedAgriculturists;
//	}
//
//	public void setBiddedAgriculturists(Set<Agriculturist> biddedAgriculturists) {
//		this.biddedAgriculturists = biddedAgriculturists;
//	}

	public Agriculturist getAcceptedFarmer() {
		return acceptedFarmer;
	}

	public void setAcceptedFarmer(Agriculturist acceptedFarmer) {
		this.acceptedFarmer = acceptedFarmer;
	}

	public String getProposalTitle() {
		return proposalTitle;
	}

	public void setProposalTitle(String proposalTitle) {
		this.proposalTitle = proposalTitle;
	}

	public Set<Bid> getBids() {
		return bids;
	}

	public void setBids(Set<Bid> bids) {
		this.bids = bids;
	}

	public boolean isVisibleToAll() {
		return isVisibleToAll;
	}

	public void setVisibleToAll(boolean isVisibleToAll) {
		this.isVisibleToAll = isVisibleToAll;
	}

	public IndustrialistProposalRequest getIndustrialistProposalRequest() {
		return industrialistProposalRequest;
	}

	public void setIndustrialistProposalRequest(IndustrialistProposalRequest industrialistProposalRequest) {
		this.industrialistProposalRequest = industrialistProposalRequest;
	}
	
	
	
	
}