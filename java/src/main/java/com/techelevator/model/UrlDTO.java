package com.techelevator.model;

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
    @JsonProperty("search") // search/{zip_code}?type=""
    private final String search = BASE_URL + "";

    public UrlDTO() {
    }

}
