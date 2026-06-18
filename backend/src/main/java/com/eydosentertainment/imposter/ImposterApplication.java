package com.eydosentertainment.imposter;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.eydosentertainment.imposter.models.Game;
import com.eydosentertainment.imposter.models.Player;
import com.eydosentertainment.imposter.services.GameService;
import com.eydosentertainment.imposter.services.PlayerService;

@SpringBootApplication
public class ImposterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImposterApplication.class, args);
	}

	// @Bean
	// CommandLineRunner runner(GameService gameService, PlayerService
	// playerService) {
	// return args -> {

	// Game game = new Game("places", "McDonalds", null);
	// // System.out.println(gameService.);
	// Player player1 = new Player();
	// Player player2 = new Player();
	// player1.setName("Hamada");
	// player1.setImposter(false);
	// player2.setName("Mark");
	// player2.setImposter(false);

	// player1 = playerService.createPlayer(player1);
	// player2 = playerService.createPlayer(player2);

	// ArrayList<Player> playerList = new ArrayList<Player>();
	// playerList.add(player1);
	// playerList.add(player2);
	// game.setPlayerList(playerList);
	// gameService.createGame(game);
	// };
	// }

}
