package com.git.oneday.inquiry;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.git.oneday.lib.TextProcesser;

@RestController
public class InquiryController {
	
	private InquiryRepository repo;
	private InquiryService inquiryService;
	
	@Autowired
	public InquiryController(InquiryRepository repo, InquiryService inquiryService) {
		this.repo = repo;
		this.inquiryService = inquiryService;
	}
	
//	@GetMapping(value = "/inquirys/{cutomerId}")
//	public List<Inquiry> getInquirys(@PathVariable long cutomerId) {
//		return repo.findAllByCustomerId(Sort.by("inquiryId").descending(), cutomerId);
//	}
	
	@GetMapping(value = "/inquirys/{inquiryId}")
	public List<Inquiry> getInquirys(@PathVariable long inquiryId) {
		return repo.findAll(Sort.by("inquiryId").descending());
	}
	
    @GetMapping(value = "/inquiry/paging")
	public Page<Inquiry> getInquiryspaging(@RequestParam int page, @RequestParam int size) {
		return repo.findAll(PageRequest.of(page, size, Sort.by("inquiryId").descending()));
	}
	
	@PostMapping(value = "/inquirys")
	public Inquiry addInquiry(@RequestBody Inquiry inquiry, HttpServletResponse res) {
		System.out.println(inquiry);
		
		if (TextProcesser.isEmptyText(inquiry.getDescription())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Inquiry inquirySaved = repo.save(inquiry);
		
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		inquiryService.sendInquiry(inquirySaved);
		return inquirySaved;
		
	}
		
	@DeleteMapping(value = "/inquiry/{inquiryId}")
	public boolean removeInquiry(@PathVariable long id, HttpServletRequest req, HttpServletResponse res) {
		
		Optional<Inquiry> inquiry = repo.findById(id);
		
		if (inquiry.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		
		repo.deleteById(id);
		return true;
	}
	
	@PutMapping(value = "/inquiry/{inquiryId}")
	public Inquiry modifyInquiry(@PathVariable long id, @RequestBody Inquiry inquiry,HttpServletResponse res) {
		
		Optional<Inquiry> inquiryItem = repo.findById(id);
		if (inquiryItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
		
		if (TextProcesser.isEmptyText(inquiry.getDescription())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		Inquiry inquiryToSave = inquiryItem.get();
		
		inquiryToSave.setInquiryId(inquiry.getInquiryId());
		inquiryToSave.setOneDayClassId(inquiry.getOneDayClassId());
		inquiryToSave.setOneDayClassName(inquiry.getOneDayClassName());
		inquiryToSave.setTitle(inquiry.getTitle());
		inquiryToSave.setName(inquiry.getName());
		inquiryToSave.setTel(inquiry.getTel());
		inquiryToSave.setEmail(inquiry.getEmail());
		inquiryToSave.setDescription(TextProcesser.getPlainText(inquiry.getDescription()));
		inquiryToSave.setAnswer(inquiry.getAnswer());
		inquiryToSave.setCreatedTime(inquiry.getCreatedTime());
		
		return repo.save(inquiryToSave);
	}
}

