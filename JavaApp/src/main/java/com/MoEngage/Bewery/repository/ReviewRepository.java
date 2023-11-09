package com.MoEngage.Bewery.repository;

import com.MoEngage.Bewery.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.persistence.*;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByBreweryId(String breweryId);
}

