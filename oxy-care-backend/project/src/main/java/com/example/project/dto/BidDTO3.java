package com.example.project.dto;

import java.time.LocalDate;

public class BidDTO3 {
	
	private String amount;
	private LocalDate date;
	private String noOfDays;
	
	public BidDTO3() {}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getNoOfDays() {
		return noOfDays;
	}

	public void setNoOfDays(String noOfDays) {
		this.noOfDays = noOfDays;
	}
	
	

}
