package com.git.oneday.reservation;


import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDetailId implements Serializable {

	private static final long serialVersionUID = 4115897150946242178L;
	
	private long reservationId;
	private int classNumber;
}
