package com.eydosentertainment.imposter.repositories;

import com.eydosentertainment.imposter.models.Player;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {

}
