package com.git.oneday.reservation;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>{
//	List<Reservation> findByOneDayClassId(Sort sort, long oneDayClassId);
}
