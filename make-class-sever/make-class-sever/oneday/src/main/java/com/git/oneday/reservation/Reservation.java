package com.git.oneday.reservation;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	 private long oneDayClassId;
	    private String name;
	    private String tel;
	    private String reservationTime;
	    private String reservationDay;
	    private long price;
	    private int person;
	    private long capacity;
	    private String title;
	    private boolean status;   // 상태
	    private long createdTime;    // 생성시간
}