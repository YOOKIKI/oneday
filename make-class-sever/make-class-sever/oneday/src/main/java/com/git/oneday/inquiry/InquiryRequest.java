package com.git.oneday.inquiry;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryRequest {
	private long inquiryId;
	private String oneDayClassId;
	private String oneDayClassName;
	private String title;
	private String name;
	private String tel;
	private String email;
	private String description;
	private String answer;
	private long createdTime;
}
