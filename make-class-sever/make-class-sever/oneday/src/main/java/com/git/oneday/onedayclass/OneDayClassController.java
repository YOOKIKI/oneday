package com.git.oneday.onedayclass;

//import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OneDayClassController {
	
//	OneDayClassRepository repo;
//	
//	public OneDayClassController(OneDayClassRepository repo) {
//		this.repo = repo;
//	}
//
//	@Cacheable(value = "oneDayClasss"
//				, condition="(#page + 1) * #size <= 10"
//				, key = "#category+'-'+#page+'-'+#size")
//	
//	@GetMapping(value="/oneDayClasss/{category}")
//	public OneDayClassPageResponse getOneDayClasssByCategory(
//			@PathVariable String category, 
//			@RequestParam int page, 
//			@RequestParam int size){
//		
//		if(category.equals("all")) {
//			
//			Page<OneDayClass> oneDayClasssPage = repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
//			return OneDayClassPageResponse.builder()
//					.isLast(oneDayClasssPage.isLast())
//					.totalElements(oneDayClasssPage.getTotalElements())
//					.content(oneDayClasssPage.getContent())
//					.build();
//		} else {
//			
//			Page<OneDayClass> oneDayClasssPage = repo.findByCategory(PageRequest.of(page, size, Sort.by("id").descending()), category);
//			
//			return OneDayClassPageResponse.builder()
//					.isLast(oneDayClasssPage.isLast())
//					.totalElements(oneDayClasssPage.getTotalElements())
//					.content(oneDayClasssPage.getContent())
//					.build();
//		}
//	}
}