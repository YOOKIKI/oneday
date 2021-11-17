package com.git.oneday.reservation.request;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservationRequest {

	private String name; 
	private String tel;
	private String reservationDate;
	private List<ReservationDetail> details;
	
	@Data
    @NoArgsConstructor
	public static class ReservationDetail {
		
		private long reservationId;
		private String onedayclassName;
		private int price;
		private int capacity;
	}
	
}
