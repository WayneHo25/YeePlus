package com.yeeplus.backend.payload;

import java.util.ArrayList;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class DiscussionRequest {
	@NotBlank
	@Size(max = 40)
	private String title;

	@NotBlank
	private String content;

	private ArrayList favorites;

	private ArrayList tags;

	@NotNull
	private Boolean pinned;

	@NotNull
	private Long forumId;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public ArrayList getFavorites() {
		return favorites;
	}

	public void setFavorites(ArrayList favorites) {
		this.favorites = favorites;
	}

	public ArrayList getTags() {
		return tags;
	}

	public void setTags(ArrayList tags) {
		this.tags = tags;
	}

	public Boolean getPinned() {
		return pinned;
	}

	public void setPinned(Boolean pinned) {
		this.pinned = pinned;
	}

	public Long getForumId() {
		return forumId;
	}

	public void setForumId(Long forumId) {
		this.forumId = forumId;
	}

}
