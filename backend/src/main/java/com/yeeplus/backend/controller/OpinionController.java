package com.yeeplus.backend.controller;

import java.net.URI;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.yeeplus.backend.exception.ResourceNotFoundException;
import com.yeeplus.backend.model.Discussion;
import com.yeeplus.backend.model.Opinion;
import com.yeeplus.backend.payload.ApiResponse;
import com.yeeplus.backend.payload.OpinionRequest;
import com.yeeplus.backend.repository.DiscussionRepository;
import com.yeeplus.backend.repository.OpinionRepository;
import com.yeeplus.backend.security.CurrentUser;
import com.yeeplus.backend.security.UserPrincipal;

@RestController
@RequestMapping("/api/opinion")
public class OpinionController {

	@Autowired
	private OpinionRepository opinionRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	private static final Logger logger = LoggerFactory.getLogger(OpinionController.class);

	@PostMapping
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> createOpinion(@Valid @RequestBody OpinionRequest opinionRequest) {
		Opinion opinion = new Opinion(opinionRequest.getContent());

		Discussion discussion = discussionRepository.findById(opinionRequest.getDiscussionId())
				.orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", opinionRequest.getDiscussionId()));

		opinion.setDiscussion(discussion);

		Opinion result = opinionRepository.save(opinion);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{opinionId}")
				.buildAndExpand(result.getId()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Opinion Created Successfully"));
	}

	@DeleteMapping("/{opinionId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> deleteOpinion(@CurrentUser UserPrincipal currentUser, @PathVariable Long opinionId) {

		Opinion opinion = opinionRepository.findById(opinionId)
				.orElseThrow(() -> new ResourceNotFoundException("Opinion", "id", opinionId));

		if (currentUser.getId() != opinion.getCreatedBy()) {
			return new ResponseEntity(new ApiResponse(false, "You have no permission to delete this opinion."),
					HttpStatus.BAD_REQUEST);
		}

		opinionRepository.deleteById(opinionId);

		return new ResponseEntity(new ApiResponse(true, "Opinion deleted successfully"), HttpStatus.OK);

	}

}
