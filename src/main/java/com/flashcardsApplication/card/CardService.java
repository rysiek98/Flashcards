package com.flashcardsApplication.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {

    public static void removeRedundantCards(List<Card> cards, List<Card> updateCards){

        Collections.reverse(cards);
        cards.removeIf(meeting -> cards.size() > updateCards.size());
        Collections.reverse(cards);
    }

    public static void updateCard(List<Card> cards,List<Card> updateCards) {

        removeRedundantCards(cards, updateCards);

        updateCards.forEach(card -> {
            if (updateCards.indexOf(card) < cards.size()) {
                cards.get(updateCards.indexOf(card)).setWordInForeign(card.getWordInForeign());
                cards.get(updateCards.indexOf(card)).setWordInNative(card.getWordInNative());
            } else {
                cards.add(card);
            }
        });
    }

    public static void deleteCard(List<Card> cards, long id){

        cards.removeIf(card -> card.getId() == id);

    }
}
