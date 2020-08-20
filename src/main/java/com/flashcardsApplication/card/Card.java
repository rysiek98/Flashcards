package com.flashcardsApplication.card;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String wordInNative;
    private String wordInForeign;
}
