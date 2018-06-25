package com.yeeplus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yeeplus.backend.model.Discussion;
import com.yeeplus.backend.model.Forum;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
	
	List<Discussion> findByCreatedBy(Long createdBy);
	
	List<Discussion> findByForumAndPinned(Forum forum, Boolean pinned);
	
	List<Discussion> deleteByCreatedBy(Long createdBy);
	
}