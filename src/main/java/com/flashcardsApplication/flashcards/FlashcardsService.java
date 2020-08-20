package com.flashcardsApplication.flashcards;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashcardsService {
    private final FlashcardsRepository flashcardsRepository;

    List<Flashcards> findAllFlashcards(){
        return flashcardsRepository.findAll();
    }

    public Flashcards add(Flashcards flashcards) {
        return flashcardsRepository.save(flashcards);
    }
}
