package com.flashcardsApplication.flashcards;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/flashcards")
@CrossOrigin("*")
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

    @GetMapping(path = "{id}")
    private Flashcards findById(@PathVariable("id") long id){
        return flashcardsService.findById(id);
    }

    @DeleteMapping(path = "{id}")
    private String delete(@PathVariable("id") long id) {
        return flashcardsService.deleteById(id);
    }

    @DeleteMapping(path = "{flashcardID}/card/{id}")
    private String deleteCard(@PathVariable("flashcardID") long flashcardID ,@PathVariable("id") long id) {
        return flashcardsService.deleteCardById(flashcardID, id);
    }

    @PutMapping()
    private Flashcards updateCalendar(@RequestBody Flashcards flashcards) {
        return flashcardsService.updateById(flashcards);
    }

}
