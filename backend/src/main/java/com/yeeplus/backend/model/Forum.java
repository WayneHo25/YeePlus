package com.yeeplus.backend.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/*
 * Forum Entity
 */
@Entity
@Table(name = "forum")
public class Forum {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 40)
	private String slug;

	@NotBlank
	@Size(max = 40)
	private String name;
	
	@OneToMany(mappedBy = "forum", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Discussion> discussions;

	public Forum() {

	}

	public Forum(String slug, String name) {
		this.slug = slug;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
