package com.eydosentertainment.imposter.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/player")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {

    private final PlayerService playerService;
    private final GameService gameService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    public PlayerController(PlayerService playerService, GameService gameService, SimpMessagingTemplate messagingTemplate, ObjectMapper objectMapper) {
        this.playerService = playerService;
        this.gameService = gameService;
        this.messagingTemplate = messagingTemplate;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = this.playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @PostMapping("/{gameID}/playerList") 
    public ResponseEntity<List<Player>> getAllPlayersInGame(@PathVariable Long gameID) {
        List<Player> players = this.playerService.getPlayersByGameID(gameID);
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
    public ResponseEntity<?> setPlayerImposter(@PathVariable Long id, @PathVariable boolean imposter) {
        Player player = this.playerService.getPlayerByID(id);

        if (player == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Player not found"));
        }

        player.setImposter(imposter);
        this.playerService.createPlayer(player);

        return ResponseEntity.ok(player);
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Map<String, String> payload) {
        Player player = new Player();
        player.setName(payload.get("name"));
        Player createdPlayer = this.playerService.createPlayer(player);
        return ResponseEntity.status(201).body(createdPlayer);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deletePlayer(@RequestBody Player player)
    {
        Player removedPlayer = this.playerService.getPlayerByID(player.getId());
        this.playerService.deletPlayer(removedPlayer);
        return ResponseEntity.status(200).body(true);
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




        List<Player> players = this.playerService.getPlayersByGameID(gameID);
        this.messagingTemplate.convertAndSend(
            "/topic/game/" + gameID + "/players", 
            players
        );
        return ResponseEntity.ok(savedPlayer);
    }

    @PostMapping("/{id}/game/{gameId}/unassign")
    public ResponseEntity<?> unassignGamefromPlayer(@PathVariable Long id, @PathVariable Long gameId)
    {
        Player player = this.playerService.getPlayerByID(id);
        player.setGame(null);
        player.setVotesOn(0);
        player.setImposter(false);
        player.setVoted(false);
        this.playerService.createPlayer(player);

        List<Player> players = this.playerService.getPlayersByGameID(gameId);
        
        this.messagingTemplate.convertAndSend(
            "/topic/game/" + gameId + "/players", 
            players
        );

        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{id}/voteOn/{playerID}")
    public ResponseEntity<?> voteOnPlayer(@PathVariable Long id, @PathVariable Long playerID) {
        Player player = this.playerService.getPlayerByID(id);
        Player playerToBeVotedOn = this.playerService.getPlayerByID(playerID);
        
        if(!player.isVoted())
        {
            playerToBeVotedOn.setVotesOn(playerToBeVotedOn.getVotesOn() + 1);
            this.playerService.createPlayer(playerToBeVotedOn);

            player.setVoted(true);
            this.playerService.createPlayer(player);
        }

        List<Player> players = this.playerService.getPlayersByGameID(player.getGame().getId());
        
        this.messagingTemplate.convertAndSend(
            "/topic/game/" + player.getGame().getId() + "/players", 
            players
        );
        return ResponseEntity.ok(player);
    }
}
