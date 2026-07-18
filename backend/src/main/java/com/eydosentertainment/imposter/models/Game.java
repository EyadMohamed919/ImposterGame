package com.eydosentertainment.imposter.models;

import jakarta.persistence.*;

@Entity
@Table(name = "game")
public class Game {

    private enum Category {
        Movies,
        Places
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Category category;
    private String topic;
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Game() {

    }

    public Game(String category, String topic, String status) {
        switch (category) {
            case "movies":
                this.category = Category.Movies;
                break;

            case "places":
                this.category = Category.Places;
                break;

            default:
                this.category = Category.Places;
                break;
        }

        this.topic = topic;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}
