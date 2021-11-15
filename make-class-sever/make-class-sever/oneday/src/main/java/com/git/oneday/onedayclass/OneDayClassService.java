package com.git.oneday.onedayclass;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.git.oneday.onedayclass.event.ManagerOneDayClass;


@Service
public class OneDayClassService {
	
//	OneDayClassRepository repo;
//	
//	public OneDayClassService(OneDayClassRepository repo) {
//		this.repo = repo;
//	}
	
	@CacheEvict(value="oneDayClass", allEntries = true)
	@RabbitListener(queues = "manager.onedayclass.send")
	public void receiveOneDayClass(ManagerOneDayClass managerOneDayClass) {
		System.out.println(managerOneDayClass);
		System.out.println("메세지왔음");
//		saveOneDayClass(managerOneDayClass);
	}
	
//	public OneDayClass saveOneDayClass(ManagerOneDayClass managerOneDayClass) {
//		OneDayClass oneDayClass = OneDayClass
//									.builder()
//									.title(managerOneDayClass.getTitle())
//									.capacity(managerOneDayClass.getCapacity())
//									.photoUrl(managerOneDayClass.getPhotoUrl())
//									.fileType(managerOneDayClass.getFileType())
//									.fileName(managerOneDayClass.getFileName())
//									.managerName(managerOneDayClass.getManagerName())
//									.description(managerOneDayClass.getDescription())
//									.startTime(managerOneDayClass.getStartTime())
//									.endTime(managerOneDayClass.getEndTime())
//									.category(managerOneDayClass.getCategory())
//									.build();				
//		
//		repo.save(oneDayClass);
//		
//		return oneDayClass;
//	}
}
