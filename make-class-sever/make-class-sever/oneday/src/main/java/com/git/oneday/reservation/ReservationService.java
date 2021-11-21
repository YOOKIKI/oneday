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

    private RabbitTemplate rabbit;

    @Autowired
    public ReservationService(RabbitTemplate rabbit){
        this.rabbit = rabbit;
    }


    public void sendReservation(Reservation reservation) {
    	rabbit.convertAndSend("user.reservation.send", reservation);
    }

}