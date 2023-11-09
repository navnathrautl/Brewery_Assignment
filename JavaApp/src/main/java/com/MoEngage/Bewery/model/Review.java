package com.MoEngage.Bewery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "brewery_reviews")
public class Review {

    public Review() {
    }

    public Review(String breweryId, LocalDateTime createdAt, String description, Integer rating) {
        this.breweryId = breweryId;
        this.createdAt = createdAt;
        this.description = description;
        this.rating = rating;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brewery_id", nullable = false, unique = true)
    private String breweryId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, length = 1024)
    private String description;

    @Column(nullable = false)
    private Integer rating;

    // Constructors, getters, and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(String breweryId) {
        this.breweryId = breweryId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

}
