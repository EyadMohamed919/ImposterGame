package com.eydosentertainment.imposter.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eydosentertainment.imposter.models.Game;
import com.eydosentertainment.imposter.repositories.GameRepository;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Optional<Game> getGameByID(Long id) {

        return gameRepository.findById(id);
    }

    public List<Game> getAllGames() {

        return gameRepository.findAll();
    }

    public void createGame(Game game) {
        gameRepository.save(game);
    }

}
