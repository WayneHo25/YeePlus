package com.yeeplus.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.yeeplus.backend.model.audit.UserDateAudit;

/*
 * Opinion Entity
 */
@Entity
@Table(name = "opinion")
public class Opinion extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String content;

	@ManyToOne
	@JoinColumn(nullable = false, name = "discussion_id")
	private Discussion discussion;

	public Opinion() {

	}

	public Opinion(String content) {
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Discussion getDiscussion() {
		return discussion;
	}

	public void setDiscussion(Discussion discussion) {
		this.discussion = discussion;
	}

}
