package com.git.oneday.test;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SendTestController {
	
	private SendService service;
	
	public SendTestController (SendService service) {
		this.service = service;
	}
	
	
	@PostMapping(value = "/test-send")
	public void sendTest(@RequestBody InquiryAnswerTest test) {
		service.sendTest(test);
	}
}
