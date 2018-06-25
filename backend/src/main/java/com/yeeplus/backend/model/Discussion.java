package com.yeeplus.backend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.yeeplus.backend.model.audit.UserDateAudit;

/*
 * Discussion Entity
 */
@Entity
@Table(name = "discussion")
public class Discussion extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 40)
	private String title;

	private String slug;

	@NotBlank
	private String content;

	private ArrayList favorites;

	private ArrayList tags;

	@NotNull
	private Boolean pinned;

	@ManyToOne
	@JoinColumn(nullable = false, name = "forum_id")
	private Forum forum;

	@OneToMany(mappedBy = "discussion", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Opinion> opinions;

	public Discussion() {

	}

	public Discussion(@NotBlank @Size(max = 40) String title, String slug, @NotBlank String content,
			ArrayList favorites, ArrayList tags, @NotNull Boolean pinned) {
		this.title = title;
		this.slug = slug;
		this.content = content;
		this.favorites = favorites;
		this.tags = tags;
		this.pinned = pinned;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public ArrayList getFavorites() {
		return favorites;
	}

	public void setFavorites(ArrayList favorites) {
		this.favorites = favorites;
	}

	public ArrayList getTags() {
		return tags;
	}

	public void setTags(ArrayList tags) {
		this.tags = tags;
	}

	public Boolean getPinned() {
		return pinned;
	}

	public void setPinned(Boolean pinned) {
		this.pinned = pinned;
	}

	public Forum getForum() {
		return forum;
	}

	public void setForum(Forum forum) {
		this.forum = forum;
	}

}
