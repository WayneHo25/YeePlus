package com.yeeplus.backend.payload;

import java.time.Instant;
import java.util.ArrayList;

import com.yeeplus.backend.model.Forum;

public class DiscussionSummary {
	private Long id;
	private String title;
	private String slug;
	private String content;
	private ArrayList favorites;
	private ArrayList tags;
	private Boolean pinned;
	private Forum forum;
	private UserSummary user;
	private Instant date;
	private Long opinionCount;

	public DiscussionSummary() {

	}

	public DiscussionSummary(Long id, String title, String slug, String content, ArrayList favorites, ArrayList tags,
			Boolean pinned, Forum forum, UserSummary user, Instant date, Long opinionCount) {
		this.id = id;
		this.title = title;
		this.slug = slug;
		this.content = content;
		this.favorites = favorites;
		this.tags = tags;
		this.pinned = pinned;
		this.forum = forum;
		this.user = user;
		this.date = date;
		this.opinionCount = opinionCount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
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

	public Forum getForum() {
		return forum;
	}

	public void setForum(Forum forum) {
		this.forum = forum;
	}

	public UserSummary getUser() {
		return user;
	}

	public void setUser(UserSummary user) {
		this.user = user;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public Long getOpinionCount() {
		return opinionCount;
	}

	public void setOpinionCount(Long opinionCount) {
		this.opinionCount = opinionCount;
	}

}
