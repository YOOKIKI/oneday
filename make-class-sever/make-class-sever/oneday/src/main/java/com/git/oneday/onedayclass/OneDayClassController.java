package com.git.oneday.onedayclass;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OneDayClassController {

	OneDayClassRepository repo;
	
	@Autowired
	public OneDayClassController(OneDayClassRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping(value = "/onedayclass")
	public List<OneDayClass> getOneDayClass() {
		return repo.findAll(Sort.by("oneDayClassId").descending());
	}

	@GetMapping(value = "/onedayclass/paging")
	 public Page<OneDayClass> getOneDayClassPaging(@RequestParam int page, @RequestParam int size) {
        System.out.println("신호 왔음");
        return repo.findAll(PageRequest.of(page, size, Sort.by("oneDayClassId").descending()));
    }
	
	@GetMapping(value="/onedayclass/paging/{category}")
	public OneDayClassPageResponse getOneDayClasssByCategory(
			@PathVariable String category, 
			@RequestParam int page, 
			@RequestParam int size){
		
		if(category.equals("all")) {
			
			Page<OneDayClass> oneDayClasssPage = repo.findAll(PageRequest.of(page, size, Sort.by("oneDayClassId").descending()));
			return OneDayClassPageResponse.builder()
					.isLast(oneDayClasssPage.isLast())
					.totalElements(oneDayClasssPage.getTotalElements())
					.content(oneDayClasssPage.getContent())
					.build();
		} else {
			
			Page<OneDayClass> oneDayClasssPage = repo.findByCategory(PageRequest.of(page, size, Sort.by("oneDayClassId").descending()), category);
			
			return OneDayClassPageResponse.builder()
					.isLast(oneDayClasssPage.isLast())
					.totalElements(oneDayClasssPage.getTotalElements())
					.content(oneDayClasssPage.getContent())
					.build();
		}
	}
} 