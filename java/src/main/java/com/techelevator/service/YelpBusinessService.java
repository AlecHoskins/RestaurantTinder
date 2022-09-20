package com.techelevator.service;

import com.techelevator.model.restaurant.Restaurant;
import com.techelevator.dto.SearchDTO;
import lombok.Data;
import org.apache.tomcat.jni.Local;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
public class YelpBusinessService {

//    static final String API_KEY = "Bearer iaMEHWlcw7lHm7MnaRb88lv1rcor5PPvUY7DLToMpAAaqx9TF4mW7bWITQbjaZyTp-qRM7IKqNP7bIzgy93gIUx6hJfxabcnAoumPcpP-GwPXX8EQADNFzu0osMUY3Yx";
    static final String YELP_TOKEN = "iaMEHWlcw7lHm7MnaRb88lv1rcor5PPvUY7DLToMpAAaqx9TF4mW7bWITQbjaZyTp-qRM7IKqNP7bIzgy93gIUx6hJfxabcnAoumPcpP-GwPXX8EQADNFzu0osMUY3Yx";
    static final String API_BUSINESSES_BASE_URL ="https://api.yelp.com/v3/businesses/";

    static final int ONE_WEEK_IN_UNIX = 604800;

    private final RestTemplate restTemplate;
    private final HttpEntity<Void> authEntity;

    public YelpBusinessService() {
        restTemplate = new RestTemplate();
        authEntity = makeAuthEntity();
    }

    /********************************** GETS THE DETAILS OF A BUSINESSES BY ID *******************************/
    //business id will appear as one of first properties in the business json in business search
    public Restaurant getBusinessById(String businessId) {


        String urlQuery = getIdUrl(businessId);

        Restaurant restaurant = null;
        try {
            ResponseEntity<Restaurant> response = restTemplate.exchange(
                    urlQuery,
                    HttpMethod.GET,
                    authEntity,
                    Restaurant.class
            );
            restaurant = response.getBody();
        } catch (RestClientResponseException | ResourceAccessException e) {
            System.out.println("YelpBusinessService exception: " + e.getMessage());
        }



        return restaurant;
    }

    /********************************** SEARCHES BUSINESSES WITH SEARCH TERM AND LOCATION *******************************/
    public SearchDTO getBusinessesByTermAndLocation(String searchTerm, String location) {
        List<String> queries = new ArrayList<>();

        queries.add("open_now=true");
        if(searchTerm != null && searchTerm.length() > 0) {
            queries.add("term=" + searchTerm);
        }
        if(location != null && location.length() > 0) {
            queries.add("location=" + location);
        }

        String urlQuery = getUrlQuery(queries);
        System.out.println(urlQuery); // TODO DELETE SOUT
        SearchDTO searchResults = null;
        try {
            ResponseEntity<SearchDTO> response = restTemplate.exchange(
                    urlQuery,
                    HttpMethod.GET,
                    authEntity,
                    SearchDTO.class
            );
            searchResults = response.getBody();
        } catch (RestClientResponseException | ResourceAccessException e) {
            System.out.println("YelpBusinessService exception: " + e.getMessage());
        }

        for(Restaurant restaurant : searchResults.getRestaurants()) {
            // todo check if they're permanently closed
        }

        return searchResults;
    }

    private String getIdUrl(String id) {
        return API_BUSINESSES_BASE_URL + id;
    }

    private String getUrlQuery(List<String> queries) {
        if(queries == null) {
            return API_BUSINESSES_BASE_URL;
        }

        String urlQuery = "";
        if(queries.size() >= 1) {
            urlQuery += "search?";

            for(String query : queries) {
                urlQuery += query + "&";
            }

            urlQuery = urlQuery.substring(0, urlQuery.length() - 1);
        }

        return API_BUSINESSES_BASE_URL + urlQuery.replaceAll("\\s",""); //spaces are illegal in url search
    }

    private HttpEntity<Void> makeAuthEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(YELP_TOKEN);
        return new HttpEntity<>(headers);
    }

}