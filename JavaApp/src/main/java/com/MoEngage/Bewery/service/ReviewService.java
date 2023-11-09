package com.MoEngage.Bewery.service;

import com.MoEngage.Bewery.model.Review;
import com.MoEngage.Bewery.model.dtos.ReviewDTO;
import com.MoEngage.Bewery.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Transactional(readOnly = true)
    public Optional<ReviewDTO> findReviewByBreweryId(String breweryId) {
        return reviewRepository.findByBreweryId(breweryId)
                .map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setDescription(review.getDescription());
                    dto.setCreatedAt(review.getCreatedAt());
                    dto.setRating(review.getRating());
                    return dto;
                });
    }

    @Transactional
    public Review saveOrUpdateReviewByBreweryId(Review reviewToUpdate) {
        return reviewRepository.findByBreweryId(reviewToUpdate.getBreweryId())
                .map(review -> {
                    review.setDescription(reviewToUpdate.getDescription());
                    review.setRating(reviewToUpdate.getRating());
                    review.setCreatedAt(LocalDateTime.now());
                    return reviewRepository.save(review);
                }).orElseGet(() -> {
                    // If the review does not exist, save it as a new entry
                    return reviewRepository.save(reviewToUpdate);
                });
    }

}
