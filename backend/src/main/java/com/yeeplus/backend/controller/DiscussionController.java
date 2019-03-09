package com.yeeplus.backend.controller;

import java.net.URI;
import java.util.ArrayList;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.yeeplus.backend.exception.ResourceNotFoundException;
import com.yeeplus.backend.model.Discussion;
import com.yeeplus.backend.model.Forum;
import com.yeeplus.backend.payload.ApiResponse;
import com.yeeplus.backend.payload.DiscussionRequest;
import com.yeeplus.backend.payload.DiscussionResponse;
import com.yeeplus.backend.repository.DiscussionRepository;
import com.yeeplus.backend.repository.ForumRepository;
import com.yeeplus.backend.security.CurrentUser;
import com.yeeplus.backend.security.UserPrincipal;
import com.yeeplus.backend.service.DiscussionService;
import com.yeeplus.backend.util.Tool;

@RestController
@RequestMapping("/api/discussion")
public class DiscussionController {
	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private DiscussionService discussionService;

	private static final Logger logger = LoggerFactory.getLogger(DiscussionController.class);

	@GetMapping("/{discussionId}")
	public DiscussionResponse getDiscussionById(@PathVariable Long discussionId) {
		return discussionService.getDiscussionById(discussionId);
	}

	@PostMapping
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> createDiscussion(@Valid @RequestBody DiscussionRequest discussionRequest) {
		Discussion discussion = new Discussion(discussionRequest.getTitle(), null, discussionRequest.getContent(),
				discussionRequest.getFavorites(), discussionRequest.getTags(), discussionRequest.getPinned());

		Forum forum = forumRepository.findById(discussionRequest.getForumId())
				.orElseThrow(() -> new ResourceNotFoundException("Forum", "id", discussionRequest.getForumId()));

		discussion.setForum(forum);

		Discussion result = discussionRepository.save(discussion);

		String slug = result.getId() + "_" + Tool.toSlug(result.getTitle());

		discussion.setSlug(slug);

		result = discussionRepository.save(discussion);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{discussionId}")
				.buildAndExpand(result.getId()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Discussion created Successfully"));
	}

	@PutMapping("/toggleFavorite/{discussionId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> toggleFavorite(@CurrentUser UserPrincipal currentUser, @PathVariable Long discussionId) {

		Discussion discussion = discussionRepository.findById(discussionId)
				.orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", discussionId));

		ArrayList favorites = discussion.getFavorites();

		int matched = -1;
		Long userId = currentUser.getId();
		for (int i = 0; i < favorites.size(); i++) {
			Long element = ((Long) favorites.get(i)).longValue();
			if (element == userId) {
				matched = i;
				break;
			}
		}

		if (matched == -1) {
			favorites.add(userId);
		} else {
			favorites.remove(matched);
		}

		discussion.setFavorites(favorites);

		Discussion result = discussionRepository.save(discussion);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{discussionId}")
				.buildAndExpand(result.getId()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Toggle favorite Successfully"));

	}

	@DeleteMapping("/{discussionId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> deleteDiscussion(@CurrentUser UserPrincipal currentUser, @PathVariable Long discussionId) {

		Discussion discussion = discussionRepository.findById(discussionId)
				.orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", discussionId));

		if (currentUser.getId() != discussion.getCreatedBy()) {
			return new ResponseEntity(new ApiResponse(false, "You have no permission to delete this discussion."),
					HttpStatus.BAD_REQUEST);
		}

		discussionRepository.deleteById(discussionId);

		return new ResponseEntity(new ApiResponse(true, "Discussion deleted successfully"), HttpStatus.OK);

	}

}
