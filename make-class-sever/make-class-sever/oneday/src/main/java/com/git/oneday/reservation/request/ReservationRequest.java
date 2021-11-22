package com.git.oneday.reservation.request;

import java.util.List;

import com.git.oneday.reservation.ReservationDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequest {
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
    private long createdTime;   // 생성시간
    
}
