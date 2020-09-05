package com.flashcardsApplication.flashcards;


import com.flashcardsApplication.card.Card;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import static com.flashcardsApplication.card.CardService.updateCard;
import static com.flashcardsApplication.card.CardService.deleteCard;

@Service
@RequiredArgsConstructor
public class FlashcardsService {

    private final FlashcardsRepository flashcardsRepository;

    List<Flashcards> findAllFlashcards(){
        List<Flashcards> flashcards = flashcardsRepository.findAll();
        flashcards.sort(Comparator.comparing(Flashcards::getId));
        flashcards.forEach(flashcard -> flashcard.getCards().sort(Comparator.comparing(Card::getId)));
        return flashcards;
    }

    public Flashcards add(Flashcards flashcards) {
        return flashcardsRepository.save(flashcards);
    }

    public Flashcards findById(long id) {
        return flashcardsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public String deleteById(long id) {
        flashcardsRepository.delete(findById(id));
        return "DELETED";
    }

    @Transactional
    public Flashcards updateById(Flashcards flashcards) {
        Flashcards updateFlashcards = findById(flashcards.getId());
        updateFlashcards.setName(flashcards.getName());
        updateCard(updateFlashcards.getCards(),flashcards.getCards());
        return flashcardsRepository.save(updateFlashcards);
    }

    public String deleteCardById(long flashcardID, long id) {
        Flashcards flashcards = flashcardsRepository.findById(flashcardID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        deleteCard(flashcards.getCards(), id);
        flashcardsRepository.save(flashcards);
        return "DELETED";
    }
}
