package com.techelevator.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UrlDTO {

    private final String BASE_URL = "http://localhost:8081/";
    /**UrlController
     * Method: GET
     * Authenticated: FALSE
     * */

    private final String login = BASE_URL + "login";
    /**AuthenticationController
     * Method: POST
     * Body:
     * {
     *     "username": "Aaron",
     *     "password": "password"
     * }
     * Authenticated: FALSE
     * */

    private final String register = BASE_URL + "register";
    /**AuthenticationController
     * Method: POST
     * Body:
     * {
     *     "username": "Aaron",
     *     "password": "password",
     *     "confirmPassword": "password",
     *     "role": "ROLE_USER"
     * }
     * Authenticated: FALSE
     * */

    private final String getUsername = BASE_URL + "username";
    /**UserController
     * Method: GET
     * Authenticated: TRUE
     * */

    private final String yelp = BASE_URL + "yelp";
    /**YelpController
     * Method: GET
     * Parameters: String term, String location, int eventUnixTime
     * Authenticated: TRUE
     * */

    private final String yelpById = BASE_URL + "yelp/";
    /**YelpController
     * Method: GET
     * Path variables: yelp/{id}
     * Authenticated: TRUE
     * */

    private final String getRestaurant = BASE_URL + "restaurant/";
    /**RestaurantController
     * Method: GET
     * Path variables: restaurant/{id}
     * Authenticated: TRUE (disabled for testing)
     * */

    private final String getEvent = BASE_URL + "event/";
    /**EventController
     * Method: GET
     * Path variables: event/{id}
     * Authenticated: TRUE (disabled for testing)
     * */

    private final String getHostEvents = BASE_URL + "event/host/";
    /**EventController
     * Method: GET
     * Path variables: event/host/{id}
     * Authenticated: TRUE (disabled for testing)
     * */

    private final String addEvent = BASE_URL + "event";
    /**EventController
     * Method: POST
     * Body:
     * {
     *     long id,
     *     long hostId,
     *     int day,
     *     String time,
     *     int decision,
     *     List<Restaurant> eventRestaurants,
     *     List<Guest> guestList;
     * }
     * Authenticated: TRUE (disabled for testing)
     * */

}
