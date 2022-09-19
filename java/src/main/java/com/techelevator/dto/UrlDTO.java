package com.techelevator.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

public class UrlDTO {

    @JsonProperty private final String BASE_URL = "http://localhost:8081/";
    /**UrlController
     * Method: GET
     * Authenticated: FALSE
     * */

    @JsonProperty private final String login = BASE_URL + "login";
    /**AuthenticationController
     * Method: POST
     * Body:
     * {
     *     "username": "Aaron",
     *     "password": "password"
     * }
     * Authenticated: FALSE
     * */

    @JsonProperty private final String register = BASE_URL + "register";
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

    @JsonProperty private final String getUsername = BASE_URL + "user";
    /**UserController
     * Method: GET
     * Authenticated: TRUE
     * */

    @JsonProperty private final String addUserToGuest = BASE_URL + "user/guest";
    /**UserContrller
     * Method: PUT
     * Pathvariable: /user/guest/{url}
     * Authenticated: TRUE
     * */

    @JsonProperty private final String yelp = BASE_URL + "yelp";
    /**YelpController
     * Method: GET
     * Parameters: String term, String location, int eventUnixTime
     * Authenticated: TRUE
     * */

    @JsonProperty private final String yelpById = BASE_URL + "yelp/";
    /**YelpController
     * Method: GET
     * Path variables: yelp/{id}
     * Authenticated: TRUE
     * */

    @JsonProperty private final String getEvent = BASE_URL + "event/";
    /**EventController
     * Method: GET
     * Path variables: event/{id}
     * Authenticated: TRUE (disabled for testing)
     * */

    @JsonProperty private final String getHostEvents = BASE_URL + "event/host/";
    /**EventController
     * Method: GET
     * Path variables: event/host/{id}
     * Authenticated: TRUE
     * */

    @JsonProperty private final String getUserEvents = BASE_URL + "event/user/";
    /**EventController
     * Method: GET
     * Path variables: event/user/{id}
     * Authenticated: TRUE
     * */

    @JsonProperty private final String getFinalists = BASE_URL + "event/finalists";
    /**EventController
     * Method: GET
     * Authenticated: TRUE
     * */

    @JsonProperty private final String addEvent = BASE_URL + "event";
    /**EventController
     * Method: POST
     * Body:
     * {
     *     long hostId;
     *     String eventTitle;
     *     String eventDaytime;
     *     String decisionDeadline;
     *     List<Restaurant> eventRestaurants;
     *     List<Guest> guestList;
     * }
     * Authenticated: TRUE (disabled for testing)
     * */

    @JsonProperty private final String getGuest = BASE_URL + "guest/";
    /**GuestController
     * Method: GET
     * Path variables: guest/{url}
     * Authenticated: FALSE
     * */

    @JsonProperty private final String getGuestEvent = BASE_URL + "guest/event/";
    /**GuestController
     * Path variables: guest/event/{url}
     * Authenticated: FALSE
     * */

    @JsonProperty private final String updateVote = BASE_URL + "guest/vote";
    /**GuestController
     * Method: PUT
     * Body:
     * {
     *     guest: {
     *         long id,
     *         vote: [
     *              {
     *                  String restaurantId,
     *                  Boolean upVote (optional)
     *              },
     *              {
     *                  String restaurantId,
     *                  Boolean upVote (optional)
     *              }
     *         ]
     *     }
     * }
     * Authenticated: FALSE
     * */

}
