package com.eydosentertainment.imposter.repositories;

import com.eydosentertainment.imposter.models.Player;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByGameId(Long gameId);
}
