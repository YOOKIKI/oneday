package com.git.oneday.reservation;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

	@PostMapping(value = "/reservations")
	public Reservation requestReservation(@RequestBody ReservationRequest reqReservation, HttpServletResponse res) {
		Reservation reservationItem = Reservation
				.builder()
				.title(reqReservation.getTitle())
				.tel(reqReservation.getTel())
				.name(reqReservation.getName())
				.capacity(reqReservation.getCapacity())
				.reservationTime(reqReservation.getReservationTime())
				.reservationDay(reqReservation.getReservationDay())
				.createdTime(reqReservation.getCreatedTime())
				.oneDayClassId(reqReservation.getOneDayClassId())
				.status(reqReservation.isStatus())
				.person(reqReservation.getPerson())
				.price(reqReservation.getPrice())
				.build();
		
		Reservation reservationSaved = repo.save(reservationItem);
		
		reservationService.sendReservation(reservationSaved);
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		return reservationSaved;
		
	}

	// 목록 조회
	@GetMapping(value = "/reservations")
	public List<Reservation> getReservations(){
//		// 하위 테이블까지 조회함
		return repo.findAll(Sort.by("oneDayClassId").descending());

	}
	
	@GetMapping(value = "/reservations/paging")
	public Page<Reservation> getReservationPaging(@RequestParam int page, @RequestParam int size) {
//		System.out.println("신호 왔음");
		return repo.findAll(PageRequest.of(page, size, Sort.by("oneDayClassId").descending()));
	}
	
//	// 1건만 조회
//		// 하위 테이블 정보를 포함하여 반환
//		@GetMapping(value= "/reservations/{oneDayClassId}")
//		public Reservation getReservation(@PathVariable long oneDayClassId){
//			System.out.println(oneDayClassId);
//			List<Reservation> reservationList;
//			
//		 reservationList = repo.findByOneDayClassId(Sort.by("oneDayClassId"),oneDayClassId);
//			return null;
//		}
}
