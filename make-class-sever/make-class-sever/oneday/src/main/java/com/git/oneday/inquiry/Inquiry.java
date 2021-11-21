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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Inquiry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long inquiryId;
	
	private long oneDayClassId;
	private String oneDayClassName;
	private long customerId;
	private String title;
	private String name;
	private String tel;
	private String email;
	@Column(columnDefinition = "VARCHAR(1000)")
	private String description;
	private String answer;
	private long createdTime;
}
