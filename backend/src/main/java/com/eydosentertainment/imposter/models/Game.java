package com.eydosentertainment.imposter.models;

import java.util.Locale.Category;

import jakarta.persistence.*;

@Entity
@Table(name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private String topic;
    private String status;
    private final String[] PLACES_TOPIC_ARRAY = {"Gym", "Mcdonalds", "Beach", "Garage"};

    private final String[] ANIMALS_TOPIC_ARRAY = {
        "Lion", "Penguin", "Dolphin", "Elephant", "Kangaroo", 
        "Panda", "Cheetah", "Flamingo", "Owl", "Shark"
    };

    private final String[] JOBS_TOPIC_ARRAY = {
        "Doctor", "Firefighter", "Chef", "Pilot", "Astronaut", 
        "Teacher", "Police Officer", "Detective", "Mechanic", "Plumber"
    };

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Game() {

    }

    public Game(String category) {
        int index = 0;
        switch (category) {
            case "jobs":
                this.category = "jobs";
                index = (int) (Math.random() * this.JOBS_TOPIC_ARRAY.length);
                this.topic = this.JOBS_TOPIC_ARRAY[index];
                break;

            case "places":
                this.category = "places";
                index = (int) (Math.random() * this.PLACES_TOPIC_ARRAY.length);
                this.topic = this.PLACES_TOPIC_ARRAY[index];
                break;

            case "animals":
                this.category = "animals";
                index = (int) (Math.random() * this.ANIMALS_TOPIC_ARRAY.length);
                this.topic = this.ANIMALS_TOPIC_ARRAY[index];
                break;

            default:
                this.category = "default";
                this.topic = "gym";

                break;
        }

        this.status = "LOBBY";
    }

    public Long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}
