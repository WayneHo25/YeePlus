package com.yeeplus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yeeplus.backend.model.Discussion;
import com.yeeplus.backend.model.Opinion;

@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Long> {
	
	List<Opinion> findByDiscussion(Discussion discussion);
	
	List<Opinion> findByCreatedBy(Long createdBy);
	
	List<Opinion> deleteByCreatedBy(Long createdBy);

}