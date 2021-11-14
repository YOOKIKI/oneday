package com.git.oneday.onedayclass.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetailOneDayClass {
	private long oneDayClassId;
    private String title;
    private int capacity;
    private String photoUrl;
    private String fileType;
    private String fileName;
    private String managerName;
    private String description;
    private String startTime;
    private String endTime;
    private long createdTime;
}
