package com.git.oneday.onedayclass;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;


@Service
public class OneDayClassService {
	
//	OneDayClassRepository repo;
//	
//	public OneDayClassService(OneDayClassRepository repo) {
//		this.repo = repo;
//	}
	
	@RabbitListener(queues = "manager.onedayclass.send")
	public void receiveOneDayClass(OneDayClass oneDayClass) {
		System.out.println(oneDayClass);
		System.out.println("메세지왔음");
//		saveOneDayClass(detailOneDayClass)
	}
}
