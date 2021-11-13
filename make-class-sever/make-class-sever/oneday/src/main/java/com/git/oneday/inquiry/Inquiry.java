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
	private long id;
	private String onedayclassName;
	private String classId;
	private String title;
	private String name;
	private String tel;
	@Column(columnDefinition = "VARCHAR(1000)")
	private String email;
	@Column(columnDefinition = "TEXT")
	private String description;
	private long createdTime;
}
