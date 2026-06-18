package com.eydosentertainment.imposter.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/game") // All URLs in this class will start with /api/game
public class GameControllerText {

    // 1. GET Request: http://localhost:8080/api/game/status
    @GetMapping("/status")
    public String getGameStatus() {
        return "The game is running smoothly!";
        // Spring automatically sends this back as plain text or a JSON string
    }

    // 2. GET Request with a Path Variable:
    // http://localhost:8080/api/game/player/Eydos
    @GetMapping("/player/{name}")
    public String welcomePlayer(@PathVariable String name) {
        return "Welcome to the lobby, " + name + "!";
    }

    // 3. POST Request: http://localhost:8080/api/game/info
    // This returns a complex object, which Spring automatically turns into JSON!
    @PostMapping("/info")
    public Map<String, Object> getGameInfo() {
        HashMap<String, Object> info = new HashMap<>();
        info.put("gameName", "Imposter");
        info.put("maxPlayers", 10);
        info.put("status", "Lobby Waiting");

        return info; // Spring Boot automatically converts this Map into a JSON object!
    }
}