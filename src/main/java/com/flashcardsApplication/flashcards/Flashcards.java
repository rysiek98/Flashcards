package com.flashcardsApplication.flashcards;

import com.flashcardsApplication.card.Card;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Flashcards {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Card> cards;

}
