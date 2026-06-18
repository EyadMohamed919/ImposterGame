package com.eydosentertainment.imposter.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eydosentertainment.imposter.models.Game;
import com.eydosentertainment.imposter.services.GameService;

@RestController
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/game")
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> games = this.gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @GetMapping("/game/{id}")
    public ResponseEntity<Game> getGameByID(@PathVariable Long id) {
        Game game = this.gameService.getGameByID(id);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(game);
    }

    @PostMapping("/game")
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        Game createdGame = this.gameService.createGame(game);
        return ResponseEntity.status(201).body(createdGame);
    }
}
