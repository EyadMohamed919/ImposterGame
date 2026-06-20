package com.eydosentertainment.imposter.sockets;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import com.eydosentertainment.imposter.models.Game;
import com.eydosentertainment.imposter.models.Player;
import com.eydosentertainment.imposter.services.GameService;
import com.eydosentertainment.imposter.services.PlayerService;

@Controller
public class PlayerWS {
    // @MessageMapping("/hello")
    // @SendTo("/topic/greetings")
    // public Greeting greeting(HelloMessage message) throws Exception {
    //     Thread.sleep(1000); // simulated delay
    //     return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    // }

    private PlayerService playerService;
        private GameService gameService;
    
        public PlayerWS(PlayerService playerService)
        {
            this.playerService = playerService;
        }
        
        @MessageMapping("/player")
        @SendTo("/topic/player")
        public List<Player> greeting() throws Exception 
        {
            Thread.sleep(1000); // simulated delay
            List<Player> players = this.playerService.getAllPlayers();
            return players;
        }
    
        // @MessageMapping("/game/{id}/stats/{stats}")
        // @SendTo("/topic/game/{gameID}")
        // public String gamePing(@PathVariable Long gameID, @PathVariable String stats) throws Exception 
        // {
        //     // Game game = this.gameService.getGameByID(gameID);
        //     return stats;
        // }
}
