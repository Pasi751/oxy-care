package com.example.project.dto;

import java.time.LocalDate;

public class MarkBidCompleteDTO {
	
	private String proposalTitle;
	private LocalDate date;
	
	public MarkBidCompleteDTO() {
		
	}

	public String getProposalTitle() {
		return proposalTitle;
	}

	public void setProposalTitle(String proposalTitle) {
		this.proposalTitle = proposalTitle;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}
	
	

}
