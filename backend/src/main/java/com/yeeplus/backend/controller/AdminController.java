package com.yeeplus.backend.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.yeeplus.backend.exception.ResourceNotFoundException;
import com.yeeplus.backend.model.Forum;
import com.yeeplus.backend.model.Opinion;
import com.yeeplus.backend.model.User;
import com.yeeplus.backend.payload.AdminDashboard;
import com.yeeplus.backend.payload.ApiResponse;
import com.yeeplus.backend.payload.ForumRequest;
import com.yeeplus.backend.repository.DiscussionRepository;
import com.yeeplus.backend.repository.ForumRepository;
import com.yeeplus.backend.repository.OpinionRepository;
import com.yeeplus.backend.repository.UserRepository;
import com.yeeplus.backend.util.Tool;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private OpinionRepository opinionRepository;

	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

	@GetMapping("/dashboard")
	public AdminDashboard getDashboard() {
		AdminDashboard adminDashboard = new AdminDashboard();

		adminDashboard.setUserCount(userRepository.count());
		adminDashboard.setForumCount(forumRepository.count());
		adminDashboard.setDiscussionCount(discussionRepository.count());
		adminDashboard.setOpinionCount(opinionRepository.count());

		return adminDashboard;
	}

	@GetMapping("/user")
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/opinion")
	public List<Opinion> getOpinions() {
		return opinionRepository.findAll();
	}

	@PostMapping("/forum")
	public ResponseEntity<?> createForum(@Valid @RequestBody ForumRequest forumRequest) {
		if (forumRepository.existsByName(forumRequest.getName())) {
			return new ResponseEntity(new ApiResponse(false, "Forum name is already taken!"), HttpStatus.BAD_REQUEST);
		}

		String slug = Tool.toSlug(forumRequest.getName());

		Forum forum = new Forum(slug, forumRequest.getName());

		Forum result = forumRepository.save(forum);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{forumId}")
				.buildAndExpand(result.getId()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Forum Created Successfully"));
	}

	@DeleteMapping("/user/{username}")
	@Transactional
	public ResponseEntity<?> deleteUser(@PathVariable String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

		opinionRepository.deleteByCreatedBy(user.getId());

		discussionRepository.deleteByCreatedBy(user.getId());

		userRepository.delete(user);

		return new ResponseEntity(new ApiResponse(true, "User deleted successfully"), HttpStatus.OK);
	}

	@DeleteMapping("/forum/{forumId}")
	public ResponseEntity<?> deleteForum(@PathVariable Long forumId) {
		if (!forumRepository.existsById(forumId)) {
			return new ResponseEntity(new ApiResponse(false, "Forum id does not exist!"), HttpStatus.NOT_FOUND);
		}

		forumRepository.deleteById(forumId);

		return new ResponseEntity(new ApiResponse(true, "Fourm deleted successfully"), HttpStatus.OK);
	}

	@DeleteMapping("/discussion/{discussionId}")
	public ResponseEntity<?> deleteDiscussion(@PathVariable Long discussionId) {
		if (!discussionRepository.existsById(discussionId)) {
			return new ResponseEntity(new ApiResponse(false, "Discussion id does not exist!"), HttpStatus.NOT_FOUND);
		}

		discussionRepository.deleteById(discussionId);

		return new ResponseEntity(new ApiResponse(true, "Discussion deleted successfully"), HttpStatus.OK);
	}

	@DeleteMapping("/opinion/{opinionId}")
	public ResponseEntity<?> deleteOpinion(@PathVariable Long opinionId) {
		if (!opinionRepository.existsById(opinionId)) {
			return new ResponseEntity(new ApiResponse(false, "Opinion id does not exist!"), HttpStatus.NOT_FOUND);
		}

		opinionRepository.deleteById(opinionId);

		return new ResponseEntity(new ApiResponse(true, "Opinion deleted successfully"), HttpStatus.OK);
	}

}
