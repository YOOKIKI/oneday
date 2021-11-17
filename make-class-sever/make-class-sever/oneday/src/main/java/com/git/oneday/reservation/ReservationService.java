package com.git.oneday.reservation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.git.oneday.onedayclass.OneDayClass;
import com.git.oneday.reservation.request.ReservationRequest;

@Service
public class ReservationService {

    private ReservationRepository reservationRepo;
    private ReservationDetailRepository detailRepo;

    private RabbitTemplate rabbit;

    @Autowired
    public ReservationService(ReservationRepository reservationRepo, ReservationDetailRepository detailRepo, RabbitTemplate rabbit){
        this.reservationRepo = reservationRepo;
        this.detailRepo = detailRepo;
        this.rabbit = rabbit;
    }

    @Transactional(rollbackOn = Exception.class)
    public Reservation saveReservation(ReservationRequest reqReservation) {
        // 금액 합산
        long total = 0;
        for(ReservationRequest.ReservationDetail reqDetail : reqReservation.getDetails()){
        	total += reqDetail.getCapacity() * reqDetail.getPrice();
        }
    
    Reservation toSaveReservation = Reservation.builder()
    		.name(reqReservation.getName())
    		.tel(reqReservation.getTel())
    		.reservationDate(reqReservation.getReservationDate())
    		.totalAmount(total)
    		.status("00")
    		.createdTime(new Date().getTime())
    		.build();
    
    Reservation savedReservation = reservationRepo.save(toSaveReservation);
    
    List<ReservationDetail> toSaveDetails = new ArrayList<ReservationDetail>();
    for(ReservationRequest.ReservationDetail reqDetail : reqReservation.getDetails()) {
    	ReservationDetail detail = ReservationDetail.builder()
    			.reservationId(savedReservation.getId())
    			.classNumber(reqReservation.getDetails().indexOf(reqDetail) + 1)
    			.oneDayClass(OneDayClass.builder().oneDayClassId(reqDetail.getReservationId()).build())
    			.oneDayClassName(reqDetail.getOnedayclassName())
    			.price(reqDetail.getPrice())
    			.capacity(reqDetail.getCapacity())
    			.build();
    	
    	toSaveDetails.add(detail);
    }
    	
    	List <ReservationDetail> savedReservationDetails = detailRepo.saveAll(toSaveDetails);
    	
    	savedReservation.setDetails(savedReservationDetails);
    	
    	return savedReservation;
    }
    
    public void sendReservation(Reservation reservation) {
    
    	rabbit.convertAndSend("user.reservation.send", reservation);
    }

}
