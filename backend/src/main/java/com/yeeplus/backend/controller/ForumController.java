package com.yeeplus.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yeeplus.backend.model.Forum;
import com.yeeplus.backend.payload.DiscussionSummary;
import com.yeeplus.backend.repository.ForumRepository;
import com.yeeplus.backend.service.ForumService;

@RestController
@RequestMapping("/api/forum")
public class ForumController {
	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private ForumService forumService;

	private static final Logger logger = LoggerFactory.getLogger(ForumController.class);

	@GetMapping
	public List<Forum> getForums() {
		return forumRepository.findAll();
	}

	@GetMapping("/{forumId}/pin")
	public List<DiscussionSummary> getForumById1(@PathVariable Long forumId) {
		return forumService.getForumByIdAndPinned(forumId, false);
	}

	@GetMapping("/{forumId}/pinned")
	public List<DiscussionSummary> getForumById2(@PathVariable Long forumId) {
		return forumService.getForumByIdAndPinned(forumId, true);
	}

}
