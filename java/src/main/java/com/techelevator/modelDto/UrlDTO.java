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
    @JsonProperty("yelp")
    private final String search = BASE_URL + "yelp";
    @JsonProperty("yelpById")
    private final String restaurant = BASE_URL + "yelp/";
    @JsonProperty("yelpUnixSearch")
    private final String searchWithUnixTime = search;
    @JsonProperty("getEvent")
    private final String getEvent = BASE_URL + "/event/";
    @JsonProperty("getHostEvents")
    private final String getHostEvents = BASE_URL + "/event/host/{}";
//    @JsonProperty("createEvent")
//    private final String createEvent = BASE_URL + "/event";


    public UrlDTO() {
    }

}
