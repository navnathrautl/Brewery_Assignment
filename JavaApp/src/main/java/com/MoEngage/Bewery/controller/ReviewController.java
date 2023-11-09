package com.MoEngage.Bewery.controller;

import com.MoEngage.Bewery.model.Review;
import com.MoEngage.Bewery.model.dtos.ReviewDTO;
import com.MoEngage.Bewery.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{breweryId}")
    public ResponseEntity<ReviewDTO> getReviewByBreweryId(@PathVariable String breweryId) {
        return reviewService.findReviewByBreweryId(breweryId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Review> createOrUpdateReview(@RequestBody Review review) {
        Review savedReview = reviewService.saveOrUpdateReviewByBreweryId(review);
        return ResponseEntity.ok(savedReview);
    }
}
