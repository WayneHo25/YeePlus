package com.yeeplus.backend.payload;

import java.util.List;

public class UserProfile {
	private Long id;
	private String name;
	private String username;
	private String avatarUrl;
	private String email;
	private List<DiscussionSummary> discussionSummary;

	public UserProfile(Long id, String name, String username, String avatarUrl, String email,
			List<DiscussionSummary> discussionSummary) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.avatarUrl = avatarUrl;
		this.email = email;
		this.discussionSummary = discussionSummary;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<DiscussionSummary> getDiscussionSummary() {
		return discussionSummary;
	}

	public void setDiscussionSummary(List<DiscussionSummary> discussionSummary) {
		this.discussionSummary = discussionSummary;
	}

}
