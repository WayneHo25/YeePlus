package com.yeeplus.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yeeplus.backend.model.Forum;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {
	
	Boolean existsByName(String name);

}
