package com.yeeplus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yeeplus.backend.payload.UserIdentityAvailability;
import com.yeeplus.backend.payload.UserProfile;
import com.yeeplus.backend.payload.UserSummary;
import com.yeeplus.backend.repository.UserRepository;
import com.yeeplus.backend.security.CurrentUser;
import com.yeeplus.backend.security.UserPrincipal;
import com.yeeplus.backend.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;
	
	@GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getName(), 
        		currentUser.getUsername(), currentUser.getAvatarUrl(), currentUser.getEmail());
        return userSummary;
    }

	@GetMapping("/profile/{username}")
	public UserProfile getProfileByUsername(@PathVariable String username) {
		return userService.getProfileByUsername(username);
	}

	@GetMapping("/checkUsernameAvailability")
	public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
		Boolean isAvailable = !userRepository.existsByUsername(username);
		return new UserIdentityAvailability(isAvailable);
	}

	@GetMapping("/checkEmailAvailability")
	public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
		Boolean isAvailable = !userRepository.existsByEmail(email);
		return new UserIdentityAvailability(isAvailable);
	}

}
