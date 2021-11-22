package com.git.oneday.inquiry;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class InquiryAnswer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long answerId;
	
	private long customerId;
	private long oneDayClassId;
	private String oneDayClassName;
	private String description;
	private long createdTime;
	private String answer;
}
