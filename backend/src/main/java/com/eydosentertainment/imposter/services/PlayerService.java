package com.eydosentertainment.imposter.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eydosentertainment.imposter.models.Player;
import com.eydosentertainment.imposter.repositories.PlayerRepository;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player getPlayerByID(Long id) {
        return playerRepository.findById(id).orElse(null);
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public void deletPlayer(Player player) {
        playerRepository.delete(player);
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
}
