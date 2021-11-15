package com.git.oneday.onedayclass;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OneDayClassPageResponse {

	private boolean isLast;
	private long totalElements;
	private List<OneDayClass> content;
}
