package com.git.oneday.inquiry;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InquiryController {
	
	private InquiryRepository repo;
	
	public InquiryController(InquiryRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping(value = "/inquirys")
	public List<Inquiry> getInquirys() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}
	
	@PostMapping(value = "/inquirys")
	public Inquiry addInquiry(@RequestBody Inquiry inquiry, HttpServletResponse res) {
		System.out.println(inquiry);
		
		if (inquiry.getDescription() == null || inquiry.getDescription().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		String description = getPlainText(inquiry.getDescription());
		if (description.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (inquiry.getEmail() == null || inquiry.getEmail().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String email = getPlainText(inquiry.getEmail());
		if (email.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (inquiry.getTel() == null || inquiry.getTel().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String tel = getPlainText(inquiry.getTel());
		if (tel.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (inquiry.getName() == null || inquiry.getName().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String name = getPlainText(inquiry.getName());
		if (name.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		if (inquiry.getTitle() == null || inquiry.getTitle().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String title = getPlainText(inquiry.getTitle());
		if (title.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		if (inquiry.getClassId() == null || inquiry.getClassId().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String classId = getPlainText(inquiry.getClassId());
		if (classId.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		if (inquiry.getOnedayclassName() == null || inquiry.getOnedayclassName().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String onedayclassName = getPlainText(inquiry.getOnedayclassName());
		if (onedayclassName.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Inquiry inquiryItem = Inquiry.builder().description(description).email(email).tel(tel).name(name).title(title).classId(classId).onedayclassName(onedayclassName)
				.createdTime(new Date().getTime()).build();

		Inquiry inquirySaved = repo.save(inquiryItem);
		
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		return inquirySaved;
	}
		
	@DeleteMapping(value = "/inquirys/{id}")
	public boolean removeInquiry(@PathVariable long id, HttpServletResponse res) {
		
		Optional<Inquiry> inquiry = repo.findById(id);
		
		if (inquiry.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		
		repo.deleteById(id);
		return true;
	}
	
	@PutMapping(value = "/inquirys/{id}")
	public Inquiry modifyInquiry(@PathVariable long id, @RequestBody Inquiry inquiry,HttpServletResponse res) {
		
		Optional<Inquiry> inquiryItem = repo.findById(id);
	
	if (inquiryItem.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_NOT_FOUND);
		return null;
	}
	if (inquiry.getClassId() == null || inquiry.getClassId().isEmpty()) {

		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	String classId = getPlainText(inquiry.getClassId());
	if (classId.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}
	
	if (inquiry.getOnedayclassName() == null || inquiry.getOnedayclassName().isEmpty()) {

		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	String onedayclassName = getPlainText(inquiry.getOnedayclassName());
	if (onedayclassName.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}
	
	if (inquiry.getTitle() == null || inquiry.getTitle().isEmpty()) {

		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	String title = getPlainText(inquiry.getTitle());
	if (title.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}
	
	if (inquiry.getTel() == null || inquiry.getTel().isEmpty()) {

		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	String tel = getPlainText(inquiry.getTel());
	if (tel.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}
	if (inquiry.getName() == null || inquiry.getName().isEmpty()) {

		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	String name = getPlainText(inquiry.getName());
	if (name.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}
	if (inquiry.getEmail() == null || inquiry.getEmail().isEmpty()) {

		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	String email = getPlainText(inquiry.getEmail());
	if (email.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}
	if (inquiry.getDescription() == null || inquiry.getDescription().isEmpty()) {

		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	String description = getPlainText(inquiry.getDescription());
	if (description.isEmpty()) {
		res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return null;
	}

	Inquiry inquiryToSave = inquiryItem.get();
	
	inquiryToSave.setClassId(classId);
	inquiryToSave.setOnedayclassName(onedayclassName);
	inquiryToSave.setTitle(title);
	inquiryToSave.setTel(tel);
	inquiryToSave.setName(name);
	inquiryToSave.setEmail(email);
	inquiryToSave.setDescription(description);

	Inquiry inquirySaved = repo.save(inquiryItem.get());
	
		return inquirySaved;
	}
	
	
	private String getPlainText(String text) {
		return text.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}
}
