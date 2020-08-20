package com.flashcardsApplication.flashcards;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardsRepository extends JpaRepository<Flashcards, Long> {
}
