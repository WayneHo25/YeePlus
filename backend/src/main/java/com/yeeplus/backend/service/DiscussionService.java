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
import com.yeeplus.backend.model.Opinion;
import com.yeeplus.backend.model.User;
import com.yeeplus.backend.payload.DiscussionResponse;
import com.yeeplus.backend.payload.OpinionResponse;
import com.yeeplus.backend.payload.UserSummary;
import com.yeeplus.backend.repository.DiscussionRepository;
import com.yeeplus.backend.repository.OpinionRepository;
import com.yeeplus.backend.repository.UserRepository;
import com.yeeplus.backend.util.ModelMapper;

@Service
public class DiscussionService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private OpinionRepository opinionRepository;

	private static final Logger logger = LoggerFactory.getLogger(DiscussionService.class);

	public DiscussionResponse getDiscussionById(Long discussionId) {
		Discussion discussion = discussionRepository.findById(discussionId)
				.orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", discussionId));

		// Retrieve discussion creator details
		User creator = userRepository.findById(discussion.getCreatedBy())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", discussion.getCreatedBy()));

		UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getName(), creator.getUsername(),
				creator.getAvatarUrl(), creator.getEmail());

		// Retrieve forum details
		Forum forum = discussion.getForum();

		// Retrieve all opinions in this discussion
		List<Opinion> opinions = opinionRepository.findByDiscussion(discussion);

		List<OpinionResponse> opinionResponses = opinions.stream().map(opinion -> {
			OpinionResponse opinionResponse = new OpinionResponse();
			opinionResponse.setId(opinion.getId());
			opinionResponse.setContent(opinion.getContent());

			User opinionCreator = userRepository.findById(opinion.getCreatedBy())
					.orElseThrow(() -> new ResourceNotFoundException("User", "id", opinion.getCreatedBy()));

			UserSummary opinionCreatorSummary = new UserSummary(opinionCreator.getId(), opinionCreator.getName(),
					opinionCreator.getUsername(), opinionCreator.getAvatarUrl(), opinionCreator.getEmail());

			opinionResponse.setUser(opinionCreatorSummary);
			opinionResponse.setDate(opinion.getCreatedAt());

			return opinionResponse;
		}).collect(Collectors.toList());

		return ModelMapper.mapDiscussionToDiscussionResponse(discussion, creatorSummary, forum, opinionResponses);
	}

}
