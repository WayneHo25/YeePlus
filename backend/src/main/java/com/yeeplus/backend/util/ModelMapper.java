package com.yeeplus.backend.util;

import java.util.List;

import com.yeeplus.backend.model.Discussion;
import com.yeeplus.backend.model.Forum;
import com.yeeplus.backend.payload.DiscussionResponse;
import com.yeeplus.backend.payload.OpinionResponse;
import com.yeeplus.backend.payload.UserSummary;

public class ModelMapper {

	public static DiscussionResponse mapDiscussionToDiscussionResponse(Discussion discussion,
			UserSummary creatorSummary, Forum forum, List<OpinionResponse> opinionResponses) {
		DiscussionResponse discussionResponse = new DiscussionResponse();

		discussionResponse.setId(discussion.getId());
		discussionResponse.setTitle(discussion.getTitle());
		discussionResponse.setSlug(discussion.getSlug());
		discussionResponse.setContent(discussion.getContent());
		discussionResponse.setFavorites(discussion.getFavorites());
		discussionResponse.setTags(discussion.getTags());
		discussionResponse.setPinned(discussion.getPinned());
		discussionResponse.setDate(discussion.getCreatedAt());

		discussionResponse.setForum(forum);

		discussionResponse.setResponses(opinionResponses);

		discussionResponse.setUser(creatorSummary);

		return discussionResponse;
	}

}
