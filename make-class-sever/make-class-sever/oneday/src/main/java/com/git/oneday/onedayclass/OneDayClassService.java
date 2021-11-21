package com.git.oneday.onedayclass;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.git.oneday.onedayclass.event.ManagerOneDayClass;


@Service
public class OneDayClassService {
	OneDayClassRepository repo;
	
	public OneDayClassService(OneDayClassRepository repo) {
		this.repo = repo;
	}

//	@CacheEvict(value="oneDayClass", allEntries = true)
	@RabbitListener(queues = "manager.onedayclass.send")
	public void receiveOneDayClass(ManagerOneDayClass managerOneDayClass) {
		System.out.println(managerOneDayClass);
		System.out.println("¸Þ¼¼ÁöµµÂø");
		saveOneDayClass(managerOneDayClass);
	}
	
	public OneDayClass saveOneDayClass(ManagerOneDayClass managerOneDayClass) {
		OneDayClass oneDayClass = OneDayClass 
				.builder()
				.title(managerOneDayClass.getTitle())
				.capacity(managerOneDayClass.getCapacity())
				.photoUrl(managerOneDayClass.getPhotoUrl())
				.fileName(managerOneDayClass.getFileName())
				.fileType(managerOneDayClass.getFileType())
				.price(managerOneDayClass.getPrice())
				.managerName(managerOneDayClass.getManagerName())
				.oneDayClassId(managerOneDayClass.getOneDayClassId())
				.description(managerOneDayClass.getDescription())
				.startTime(managerOneDayClass.getStartTime())
				.endTime(managerOneDayClass.getEndTime())
				.createdTime(managerOneDayClass.getCreatedTime())
				.category(managerOneDayClass.getCategory())
				.build();
	repo.save(oneDayClass);
	
	return oneDayClass;
	
	}
}
