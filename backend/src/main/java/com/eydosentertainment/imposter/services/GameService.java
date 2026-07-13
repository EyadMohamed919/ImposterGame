package com.eydosentertainment.imposter.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eydosentertainment.imposter.models.Game;
import com.eydosentertainment.imposter.repositories.GameRepository;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game getGameByID(Long id) {

        return gameRepository.findById(id).orElse(null);
    }

    public List<Game> getAllGames() {

        return gameRepository.findAll();
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public void deleteGame(Game game) {
        gameRepository.delete(game);
    }

}
