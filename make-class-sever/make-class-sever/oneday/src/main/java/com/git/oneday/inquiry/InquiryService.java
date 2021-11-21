package com.git.oneday.inquiry;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

@Service
public class InquiryService {
	
	private InquiryRepository repo;
	private InquiryAnswerRepository inquiryAnswerRepo;
	
	private RabbitTemplate rabbit;
	
	private InquiryService(RabbitTemplate rabbit,  InquiryAnswerRepository inquiryAnswerRepo ) {
		this.rabbit = rabbit;
		this.inquiryAnswerRepo = inquiryAnswerRepo;
	}

	public void sendInquiry(Inquiry inquiry) {
		System.out.println(inquiry);
		rabbit.convertAndSend("inquiry.question", inquiry);
	}
	
	@RabbitListener(queues = "inquiry.answer")
	public void receiveInquiry(InquiryAnswer answer) {
		System.out.println("´äº¯¿È");
		
		inquiryAnswerRepo.save(answer);
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
