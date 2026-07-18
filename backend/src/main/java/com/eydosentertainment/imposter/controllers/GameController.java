package com.eydosentertainment.imposter.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eydosentertainment.imposter.models.Game;
import com.eydosentertainment.imposter.services.GameService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {

    private final GameService gameService;
    private final SimpMessagingTemplate messagingTemplate;
    public GameController(GameService gameService, SimpMessagingTemplate messagingTemplate) {
        this.gameService = gameService;
        this.messagingTemplate = messagingTemplate;
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
        List<Game> games = this.gameService.getAllGames();
        this.messagingTemplate.convertAndSend(
            "/topic/game", 
            games
        );
        return ResponseEntity.status(201).body(createdGame);
    }

    @PostMapping("/game/update/{id}")
    public ResponseEntity<Boolean> updateStatus(@PathVariable Long id) {
        Game game = this.gameService.getGameByID(id);
        if(game.getStatus().equals("") || game.getStatus().equals(null))
        {
            game.setStatus("LOBBY");
        }
        else if(game.getStatus().equals("LOBBY"))
        {
            game.setStatus("ONGOING");
        }
        else if(game.getStatus().equals("ONGOING"))
        {
            game.setStatus("FINISHED");
        }
        this.messagingTemplate.convertAndSend(
            "/topic/game/" + id, 
            game.getStatus()
        );
        this.gameService.createGame(game);
        return ResponseEntity.status(200).body(true);
    }

    @DeleteMapping("/game/{id}")
    public ResponseEntity<Boolean> deleteGame(@PathVariable Long id)
    {
        Game game = this.gameService.getGameByID(id);
        this.gameService.deleteGame(game);
        List<Game> games = this.gameService.getAllGames();
        this.messagingTemplate.convertAndSend(
            "/topic/game", 
            games
        );
        return ResponseEntity.status(200).body(true);
    }
}
