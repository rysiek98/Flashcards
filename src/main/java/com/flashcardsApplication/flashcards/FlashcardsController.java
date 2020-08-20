package com.flashcardsApplication.flashcards;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/flashcards")
public class FlashcardsController {

    private final FlashcardsService flashcardsService;

    @GetMapping
    private List<Flashcards> findAll(){
        return flashcardsService.findAllFlashcards();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    private Flashcards setFlashcard(@RequestBody Flashcards flashcards){
        return flashcardsService.add(flashcards);
    }


}
