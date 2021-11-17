package com.git.oneday.reservation;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import com.git.oneday.onedayclass.OneDayClass;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@IdClass(ReservationDetailId.class)
public class ReservationDetail {

	@Id
	private long reservationId;		// 주문 기본정보의 id
	@Id
	private int classNumber;	// 주문 제품 정보의 번호

	@ManyToOne
	private OneDayClass oneDayClass;
	
	//	 주문당시에 정보로 기록
	private String oneDayClassName;
	private int price;
	private int capacity;
}
