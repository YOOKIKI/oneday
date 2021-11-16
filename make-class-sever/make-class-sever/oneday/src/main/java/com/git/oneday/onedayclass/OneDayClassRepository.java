package com.git.oneday.onedayclass;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OneDayClassRepository extends JpaRepository<OneDayClass, Long> {
	
	Page<OneDayClass> findByCategory(Pageable page, String category);

}
 