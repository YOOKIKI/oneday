package com.git.oneday.inquiry;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long>{
//	List<Inquiry>findAllByCustomerId(Sort sort, long customerId);
}
