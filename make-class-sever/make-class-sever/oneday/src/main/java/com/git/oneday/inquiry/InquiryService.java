package com.git.oneday.inquiry;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

@Service
public class InquiryService {
	
	private InquiryRepository repo;
	private InquiryRepository inquiryRepo;
	
	private RabbitTemplate rabbit;
	
	private InquiryService(RabbitTemplate rabbit,  InquiryRepository inquiryRepo ) {
		this.rabbit = rabbit;
		this.inquiryRepo = inquiryRepo;
	}

	public void sendInquiry(Inquiry inquiry) {
		System.out.println(inquiry);
		rabbit.convertAndSend("inquiry.question", inquiry);
	}
	
	@RabbitListener(queues = "inquiry.answer")
	public void receiveInquiry(Inquiry inquiry) {
		System.out.println("´äº¯¿È");
		
		inquiryRepo.save(inquiry);
	}
	
	public Inquiry saveInquiry(Inquiry inquiry) {
		Inquiry saveInquiry = Inquiry
				.builder()
				.inquiryId(inquiry.getInquiryId())
				.answer(inquiry.getAnswer())
				.oneDayClassId(inquiry.getOneDayClassId())
				.description(inquiry.getDescription())
				.createdTime(inquiry.getCreatedTime())
				.email(inquiry.getEmail())
				.name(inquiry.getName())
				.oneDayClassName(inquiry.getOneDayClassName())
				.tel(inquiry.getTel())
				.title(inquiry.getTitle())
				.build();
		
		repo.save(inquiry);
		
		return inquiry;
	}
}
