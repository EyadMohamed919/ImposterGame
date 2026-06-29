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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voted_player_id") // 2. This creates a foreign key column in your database
    private Player votedPlayer;

    public Player(String name, boolean imposter, Game game, Player votedPlayer) {
        this.name = name;
        this.imposter = imposter;
        this.game = game;
        this.votedPlayer = votedPlayer;
    }

    public Player() {

    }

    public Player getVotedPlayer() {
        return votedPlayer;
    }

    public void setVotedPlayer(Player votedPlayer) {
        this.votedPlayer = votedPlayer;
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
