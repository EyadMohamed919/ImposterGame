package com.eydosentertainment.imposter.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eydosentertainment.imposter.models.Game;
import com.eydosentertainment.imposter.models.Player;
import com.eydosentertainment.imposter.services.GameService;
import com.eydosentertainment.imposter.services.PlayerService;

@RestController
@RequestMapping("/player")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {

    private final PlayerService playerService;
    private final GameService gameService;
    private final SimpMessagingTemplate messagingTemplate;

    public PlayerController(PlayerService playerService, GameService gameService, SimpMessagingTemplate messagingTemplate) {
        this.playerService = playerService;
        this.gameService = gameService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = this.playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long id) {
        Player player = this.playerService.getPlayerByID(id);

        if (player == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(player);
    }

    @PostMapping("/{id}/isImposter/{isImposter}")
    public ResponseEntity<?> setPlayerImposter(@PathVariable Long id, @PathVariable boolean isImposter) {
        Player player = this.playerService.getPlayerByID(id);

        if (player == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Player not found"));
        }

        player.setImposter(isImposter);
        this.playerService.createPlayer(player);

        return ResponseEntity.ok(player);
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody String name) {
        Player player = new Player();
        player.setName(name);
        Player createdPlayer = this.playerService.createPlayer(player);
        return ResponseEntity.status(201).body(createdPlayer);
    }

    @PostMapping("/{id}/game/{gameID}")
    public ResponseEntity<?> assignGameToPlayer(@PathVariable Long id, @PathVariable Long gameID) {
        Player player = this.playerService.getPlayerByID(id);
        Game game = this.gameService.getGameByID(gameID);

        if (player == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Player not found"));
        }

        if (game == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Game not found"));
        }

        player.setGame(game);
        Player savedPlayer = this.playerService.createPlayer(player);
        return ResponseEntity.ok(savedPlayer);
    }

    // @PostMapping("/{id}/game/")
    // public ResponseEntity<?> assignRandomGameToPlayer(@PathVariable Long id) {
    //     Player player = this.playerService.getPlayerByID(id);
    //     Game game = this.gameService.getGameByID(gameID);

    //     if (player == null) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Player not found"));
    //     }

    //     if (game == null) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Game not found"));
    //     }

    //     player.setGame(game);
    //     Player savedPlayer = this.playerService.createPlayer(player);
    //     return ResponseEntity.ok(savedPlayer);
    // }

    @PostMapping("/{id}/votedPlayer/{votedPlayerID}")
    public ResponseEntity<?> voteOnPlayer(@PathVariable Long id, @PathVariable Long votedPlayerID) {
        Player player = this.playerService.getPlayerByID(id);
        Player votedPlayer = this.playerService.getPlayerByID(votedPlayerID);

        if (player == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Player not found"));
        }

        if (votedPlayer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Voted Player not found"));
        }

        if (votedPlayer.getId() == player.getId()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Player cannot vote on themselves"));
        }

        player.setVotedPlayer(votedPlayer);
        Player savedPlayer = this.playerService.createPlayer(player);

        String stats = savedPlayer.getName() + " voted on " + votedPlayer.getName();

        this.messagingTemplate.convertAndSend(
            "/topic/game/" + savedPlayer.getGame().getId(), 
            stats
        );
        return ResponseEntity.ok(savedPlayer);
    }
}
