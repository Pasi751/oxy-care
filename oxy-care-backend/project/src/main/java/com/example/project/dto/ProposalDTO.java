package com.example.project.dto;

import java.util.List;

public class ProposalDTO {
	
	private String proposalTitle;
	private String proposalDescription;
	private List<BidDTO> bidList;
	
	
	
	public ProposalDTO(String proposalTitle, String proposalDescription, List<BidDTO> bidList) {
		super();
		this.proposalTitle = proposalTitle;
		this.proposalDescription = proposalDescription;
		this.bidList = bidList;
	}


	public ProposalDTO() {
		// TODO Auto-generated constructor stub
	}


	public String getProposalTitle() {
		return proposalTitle;
	}


	public void setProposalTitle(String proposalTitle) {
		this.proposalTitle = proposalTitle;
	}


	public String getProposalDescription() {
		return proposalDescription;
	}


	public void setProposalDescription(String proposalDescription) {
		this.proposalDescription = proposalDescription;
	}


	public List<BidDTO> getBidList() {
		return bidList;
	}


	public void setBidList(List<BidDTO> bidList) {
		this.bidList = bidList;
	}
	
			
}
