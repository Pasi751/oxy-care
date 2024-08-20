package com.example.project.model;

import java.util.Set;
import jakarta.persistence.*;

@Entity
public class Agriculturist extends User {
	
//    @ManyToMany
//    @JoinTable(
//        name = "agriculturist_bidded_proposals",
//        joinColumns = @JoinColumn(name = "agriculturist_id"),
//        inverseJoinColumns = @JoinColumn(name = "proposal_id"))
//    private Set<Proposal> biddedProposals;
	
	@OneToOne(mappedBy = "agriculturist")
    private IndustrialistProposalRequest industrialistProposalRequest;
	
	
	@OneToMany(mappedBy = "agriculturist")
    private Set<Bid> bids;
    
    
    private String phoneNumber;
   
    private String typesOfTreesPlanted;
    
    private int treesPlanted;
    
    public Agriculturist() {}

    @OneToOne(mappedBy = "acceptedFarmer")
    private Proposal acceptedProposal;
    
    

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public String getTypesOfTreesPlanted() {
		return typesOfTreesPlanted;
	}

	public void setTypesOfTreesPlanted(String typesOfTreesPlanted) {
		this.typesOfTreesPlanted = typesOfTreesPlanted;
	}

	public int getTreesPlanted() {
		return treesPlanted;
	}

	public void setTreesPlanted(int treesPlanted) {
		this.treesPlanted = treesPlanted;
	}

//	public Set<Proposal> getBiddedProposals() {
//		return biddedProposals;
//	}
//
//	public void setBiddedProposals(Set<Proposal> biddedProposals) {
//		this.biddedProposals = biddedProposals;
//	}

	public Proposal getAcceptedProposal() {
		return acceptedProposal;
	}

	public void setAcceptedProposal(Proposal acceptedProposal) {
		this.acceptedProposal = acceptedProposal;
	}

	public Set<Bid> getBids() {
		return bids;
	}

	public void setBids(Set<Bid> bids) {
		this.bids = bids;
	}
	
	
	

    
    
}