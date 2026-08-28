package com.eydosentertainment.imposter.models;

import jakarta.persistence.*;

@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean imposter = false;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    private int votesOn;

    public Player(String name, boolean imposter, Game game, int votesOn) {
        this.name = name;
        this.imposter = imposter;
        this.game = game;
        this.votesOn = votesOn;
    }

    public Player() {

    }

    public int getVotesOn() {
        return votesOn;
    }

    public void setVotesOn(int votesOn) {
        this.votesOn = votesOn;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public boolean isImposter() {
        return imposter;
    }

    public void setImposter(boolean imposter) {
        this.imposter = imposter;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
