package com.git.oneday.test;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class SendService {
	
	
	private RabbitTemplate rabbit;
	
	public SendService (RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}
	
	public void sendTest(InquiryAnswerTest test) {
		rabbit.convertAndSend("inquiry.answer" ,test);
	}
}
