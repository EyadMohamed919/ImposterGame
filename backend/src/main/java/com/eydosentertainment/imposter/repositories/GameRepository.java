package com.eydosentertainment.imposter.repositories;

import com.eydosentertainment.imposter.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

}
