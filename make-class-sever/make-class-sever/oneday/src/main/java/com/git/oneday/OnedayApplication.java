package com.git.oneday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableCaching
@SpringBootApplication
public class OnedayApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnedayApplication.class, args);
	}

}
