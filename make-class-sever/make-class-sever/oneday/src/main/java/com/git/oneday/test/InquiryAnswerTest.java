package com.git.oneday.test;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InquiryAnswerTest {
	private long answerId;
	
	private long customerId;
	private long oneDayClassId;
	private String oneDayClassName;
	private String description;
	private long createdTime;
}
