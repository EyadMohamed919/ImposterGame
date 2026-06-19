package com.eydosentertainment.imposter.sockets;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.eydosentertainment.imposter.models.Player;
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
}
