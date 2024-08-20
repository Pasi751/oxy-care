package com.example.project.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private int days;
    private String skills;
    private String experience;
    private String approach;
    private String teamMemberDetails;
    private Boolean status;
    private Boolean isCompleted;
    private LocalDate date;
    
    @ManyToOne
    @JoinColumn(name = "agriculturist_id")
    private Agriculturist agriculturist;

    @ManyToOne
    @JoinColumn(name = "proposal_id")
    @JsonIgnore
    private Proposal proposal;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
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

    public String getApproach() {
        return approach;
    }

    public void setApproach(String approach) {
        this.approach = approach;
    }

    public String getTeamMemberDetails() {
        return teamMemberDetails;
    }

    public void setTeamMemberDetails(String teamMemberDetails) {
        this.teamMemberDetails = teamMemberDetails;
    }

    public Proposal getProposal() {
        return proposal;
    }

    public void setProposal(Proposal proposal) {
        this.proposal = proposal;
    }

    // toString method
    
    public Agriculturist getAgriculturist() {
		return agriculturist;
	}

	public void setAgriculturist(Agriculturist agriculturist) {
		this.agriculturist = agriculturist;
	}
	
    public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Boolean getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(Boolean isCompleted) {
		this.isCompleted = isCompleted;
	}
	
	

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	@Override
    public String toString() {
        return "Bid{" +
                "id=" + id +
                ", amount=" + amount +
                ", days=" + days +
                ", skills='" + skills + '\'' +
                ", experience='" + experience + '\'' +
                ", approach='" + approach + '\'' +
                ", teamMemberDetails='" + teamMemberDetails + '\'' +
                '}';
    }

	
}
