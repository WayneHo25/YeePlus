package com.yeeplus.backend.payload;

public class AdminDashboard {
	private Long userCount;
	private Long forumCount;
	private Long discussionCount;
	private Long opinionCount;

	public AdminDashboard() {

	}

	public AdminDashboard(Long userCount, Long forumCount, Long discussionCount, Long opinionCount) {
		this.userCount = userCount;
		this.forumCount = forumCount;
		this.discussionCount = discussionCount;
		this.opinionCount = opinionCount;
	}

	public Long getUserCount() {
		return userCount;
	}

	public void setUserCount(Long userCount) {
		this.userCount = userCount;
	}

	public Long getForumCount() {
		return forumCount;
	}

	public void setForumCount(Long forumCount) {
		this.forumCount = forumCount;
	}

	public Long getDiscussionCount() {
		return discussionCount;
	}

	public void setDiscussionCount(Long discussionCount) {
		this.discussionCount = discussionCount;
	}

	public Long getOpinionCount() {
		return opinionCount;
	}

	public void setOpinionCount(Long opinionCount) {
		this.opinionCount = opinionCount;
	}

}
