package com.yeeplus.backend.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class OpinionRequest {
	@NotBlank
	private String content;

	@NotNull
	private Long discussionId;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getDiscussionId() {
		return discussionId;
	}

	public void setDiscussionId(Long discussionId) {
		this.discussionId = discussionId;
	}

}
