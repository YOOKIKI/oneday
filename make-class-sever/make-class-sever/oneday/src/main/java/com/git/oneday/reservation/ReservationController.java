package com.git.oneday.reservation;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.git.oneday.reservation.request.ReservationRequest;

@RestController
public class ReservationController {

	private ReservationService reservationService;
	private ReservationRepository repo;
	

	@Autowired
	public ReservationController(ReservationService reservationService, ReservationRepository repo){
		this.reservationService = reservationService;
		this.repo = repo;
	}

	@PostMapping("/reservations")
	public Reservation requestReservation(@RequestBody ReservationRequest reqReservation, HttpServletResponse res) {
		Reservation reservationItem = Reservation
				.builder()
				.className(reqReservation.getClassName())
				.reservationDate(reqReservation.getReservationDate())
				.tel(reqReservation.getTel())
				.name(reqReservation.getName())
				.id(reqReservation.getId())
				.capacity(reqReservation.getCapacity())
				.createdTime(reqReservation.getCreatedTime())
				.oneDayClassId(reqReservation.getOneDayClassId())
				.status(reqReservation.isStatus())
				.totalAmount(reqReservation.getTotalAmount())
				.build();
		
		Reservation reservationSaved = repo.save(reservationItem);
		
		reservationService.sendReservation(reservationSaved);
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		return reservationSaved;
		
	}

	// 주문 목록 조회
	@GetMapping("/reservations")
	public List<Reservation> getReservations(){
//		// 하위 테이블까지 조회함
		return repo.findAll();

	}
	// 주문 1건만 조회
		// 하위 테이블 정보를 포함하여 반환
		@GetMapping("/reservations/{id}")
		public Reservation getReservation(@PathVariable long id){
			System.out.println(id);
			return repo.findById(id).orElse(null);
		}
}
