package com.yeeplus.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yeeplus.backend.exception.ResourceNotFoundException;
import com.yeeplus.backend.model.Discussion;
import com.yeeplus.backend.model.Forum;
import com.yeeplus.backend.model.User;
import com.yeeplus.backend.payload.DiscussionSummary;
import com.yeeplus.backend.payload.UserSummary;
import com.yeeplus.backend.repository.DiscussionRepository;
import com.yeeplus.backend.repository.ForumRepository;
import com.yeeplus.backend.repository.OpinionRepository;
import com.yeeplus.backend.repository.UserRepository;

@Service
public class ForumService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private OpinionRepository opinionRepository;

	private static final Logger logger = LoggerFactory.getLogger(DiscussionService.class);

	public List<DiscussionSummary> getForumByIdAndPinned(Long forumId, Boolean pinned) {

		Forum forum = forumRepository.findById(forumId)
				.orElseThrow(() -> new ResourceNotFoundException("Forum", "id", forumId));

		List<Discussion> discussions = discussionRepository.findByForumAndPinned(forum, pinned);

		List<DiscussionSummary> discussionSummarys = discussions.stream().map(discussion -> {
			DiscussionSummary discussionSummary = new DiscussionSummary();

			discussionSummary.setId(discussion.getId());
			discussionSummary.setTitle(discussion.getTitle());
			discussionSummary.setSlug(discussion.getSlug());
			discussionSummary.setContent(discussion.getContent());
			discussionSummary.setFavorites(discussion.getFavorites());
			discussionSummary.setTags(discussion.getTags());
			discussionSummary.setPinned(discussion.getPinned());
			discussionSummary.setForum(forum);

			User discussionCreator = userRepository.findById(discussion.getCreatedBy())
					.orElseThrow(() -> new ResourceNotFoundException("User", "id", discussion.getCreatedBy()));

			UserSummary discussionCreatorSummary = new UserSummary(discussionCreator.getId(),
					discussionCreator.getName(), discussionCreator.getUsername(), discussionCreator.getAvatarUrl(),
					discussionCreator.getEmail());

			discussionSummary.setUser(discussionCreatorSummary);
			discussionSummary.setDate(discussion.getCreatedAt());
			discussionSummary.setOpinionCount((long) opinionRepository.findByDiscussion(discussion).size());

			return discussionSummary;
		}).collect(Collectors.toList());

		return discussionSummarys;

	}

}
