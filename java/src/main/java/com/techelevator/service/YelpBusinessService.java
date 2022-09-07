package com.techelevator.service;

import com.mashape.unirest.http.HttpResponse;
        import com.mashape.unirest.http.Unirest;
        import com.mashape.unirest.http.exceptions.UnirestException;
import com.techelevator.modelDto.RestaurantDTO;
import com.techelevator.modelDto.SearchDTO;
import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

@Data
@Service
public class YelpBusinessService {

    static final String API_KEY = "Bearer iaMEHWlcw7lHm7MnaRb88lv1rcor5PPvUY7DLToMpAAaqx9TF4mW7bWITQbjaZyTp-qRM7IKqNP7bIzgy93gIUx6hJfxabcnAoumPcpP-GwPXX8EQADNFzu0osMUY3Yx";
    static final String YELP_TOKEN = "iaMEHWlcw7lHm7MnaRb88lv1rcor5PPvUY7DLToMpAAaqx9TF4mW7bWITQbjaZyTp-qRM7IKqNP7bIzgy93gIUx6hJfxabcnAoumPcpP-GwPXX8EQADNFzu0osMUY3Yx";
    static final String API_BUSINESSES_BASE_URL ="https://api.yelp.com/v3/businesses/";

    private RestTemplate restTemplate;

    public YelpBusinessService() {
        restTemplate = new RestTemplate();
    }

    /********************************** GETS THE DETAILS OF A BUSINESSES BY ID *******************************/
    //business id will appear as one of first properties in the business json in business search
    public RestaurantDTO getBusinessById(String businessId) {
        String urlQuery = getUrlQuery(businessId);

        RestaurantDTO restaurant = null;
        try {
            ResponseEntity<RestaurantDTO> response = restTemplate.exchange(
                    urlQuery,
                    HttpMethod.GET,
                    makeAuthEntity(),
                    RestaurantDTO.class
            );
            restaurant = response.getBody();
        } catch (RestClientResponseException | ResourceAccessException e) {
            System.out.println(e.getMessage());
        }

        return restaurant;
    }

    /********************************** SEARCHES BUSINESSES WITH SEARCH TERM AND LOCATION *******************************/
    public SearchDTO getBusinessesByTermAndLocation(String searchTerm, String location) {
        String urlQuery = getUrlQuery("search?term=" + searchTerm + "&location=" + location);

        SearchDTO searchResults = null;
        try {
            ResponseEntity<SearchDTO> response = restTemplate.exchange(
                    urlQuery,
                    HttpMethod.GET,
                    makeAuthEntity(),
                    SearchDTO.class
            );
            searchResults = response.getBody();
        } catch (RestClientResponseException | ResourceAccessException e) {
            System.out.println(e.getMessage());
        }

        return searchResults;
    }

    public SearchDTO getBusinessesByTermAndLocation(String searchTerm, String location, int unixTime) {
        String urlQuery = getUrlQuery("search?term=" + searchTerm + "&location=" + location + "&open_at=" + unixTime);

        SearchDTO searchResults = null;
        try {
            ResponseEntity<SearchDTO> response = restTemplate.exchange(
                    urlQuery,
                    HttpMethod.GET,
                    makeAuthEntity(),
                    SearchDTO.class
            );
            searchResults = response.getBody();
        } catch (RestClientResponseException | ResourceAccessException e) {
            System.out.println(e.getMessage());
        }

        return searchResults;
    }

//    public static void setAuthToken(String authToken) {
//        ApiService.authToken = authToken;
//    }

    private String getUrlQuery(String urlQuery) {
        return API_BUSINESSES_BASE_URL + urlQuery.replaceAll("\\s",""); //spaces are illegal in url search
    }

    private HttpEntity<Void> makeAuthEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(YELP_TOKEN);
        return new HttpEntity<>(headers);
    }

}
