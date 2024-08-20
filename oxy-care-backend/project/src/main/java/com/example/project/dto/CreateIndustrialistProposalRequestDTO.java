package com.example.project.dto;

import com.example.project.model.Proposal;

public class CreateIndustrialistProposalRequestDTO {
	
    private String industrialistUsername;
    private String agriculturistUsername;
    private Proposal proposal;

    
    public CreateIndustrialistProposalRequestDTO() {}


	public String getIndustrialistUsername() {
		return industrialistUsername;
	}


	public void setIndustrialistUsername(String industrialistUsername) {
		this.industrialistUsername = industrialistUsername;
	}


	public String getAgriculturistUsername() {
		return agriculturistUsername;
	}


	public void setAgriculturistUsername(String agriculturistUsername) {
		this.agriculturistUsername = agriculturistUsername;
	}


	public Proposal getProposal() {
		return proposal;
	}


	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}
    
    
}
