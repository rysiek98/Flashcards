package com.flashcardsApplication.flashcards;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlashcardsRepository extends JpaRepository<Flashcards, Long> {

    @Override
    @Query("select distinct f from Flashcards f left join fetch f.cards")
    List<Flashcards> findAll();
}
