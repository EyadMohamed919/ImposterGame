package com.eydosentertainment.imposter.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eydosentertainment.imposter.models.Player;
import com.eydosentertainment.imposter.services.PlayerService;

@RestController
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/player")
    public List<Player> getAllPlayers() {
        return this.playerService.getAllPlayers();
    }

    @GetMapping("/player/{id}")
    public Player getPlayer(@PathVariable Long id) {
        return this.playerService.getPlayerByID(id);
    }

    @PostMapping("/player")
    public Player createPlayer(@RequestBody Player player) {

        return this.playerService.createPlayer(player);
    }

}
