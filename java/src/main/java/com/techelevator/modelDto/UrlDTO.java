package com.techelevator.modelDto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UrlDTO {

    @JsonProperty("BASE_URL")
    private final String BASE_URL = "http://localhost:8081/";
    @JsonProperty("login")
    private final String login = BASE_URL + "login";
    @JsonProperty("register")
    private final String register = BASE_URL + "register";
    @JsonProperty("getUsername")
    private final String getUsername = BASE_URL + "username";
    @JsonProperty("search")
    private final String search = BASE_URL + "search";
    @JsonProperty("restaurant")
    private final String restaurant = BASE_URL + "restaurant/";

    public UrlDTO() {
    }

}
