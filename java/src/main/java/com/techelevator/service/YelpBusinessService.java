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

import java.util.ArrayList;
import java.util.List;

@Data
@Service
public class YelpBusinessService {

//    static final String API_KEY = "Bearer iaMEHWlcw7lHm7MnaRb88lv1rcor5PPvUY7DLToMpAAaqx9TF4mW7bWITQbjaZyTp-qRM7IKqNP7bIzgy93gIUx6hJfxabcnAoumPcpP-GwPXX8EQADNFzu0osMUY3Yx";
    static final String YELP_TOKEN = "iaMEHWlcw7lHm7MnaRb88lv1rcor5PPvUY7DLToMpAAaqx9TF4mW7bWITQbjaZyTp-qRM7IKqNP7bIzgy93gIUx6hJfxabcnAoumPcpP-GwPXX8EQADNFzu0osMUY3Yx";
    static final String API_BUSINESSES_BASE_URL ="https://api.yelp.com/v3/businesses/";

    static final int ONE_WEEK_IN_UNIX = 604800;

    private RestTemplate restTemplate;
    private HttpEntity<Void> authEntity;

    public YelpBusinessService() {
        restTemplate = new RestTemplate();
        authEntity = makeAuthEntity();
    }

    /********************************** GETS THE DETAILS OF A BUSINESSES BY ID *******************************/
    //business id will appear as one of first properties in the business json in business search
    public RestaurantDTO getBusinessById(String businessId) {
        String urlQuery = getIdUrl(businessId);

        RestaurantDTO restaurant = null;
        try {
            ResponseEntity<RestaurantDTO> response = restTemplate.exchange(
                    urlQuery,
                    HttpMethod.GET,
                    authEntity,
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
        return getBusinessesByTermAndLocation(searchTerm, location, -1);
    }

    public SearchDTO getBusinessesByTermAndLocation(String searchTerm, String location, int unixTime) {
        List<String> queries = new ArrayList<>();

        if(searchTerm != null && searchTerm.length() > 0) {
            queries.add("term=" + searchTerm);
        }
        if(location != null && location.length() > 0) {
            queries.add("location=" + location);
        }
        if(unixTime > 0) {
            queries.add("open_at=" + unixTime);
        }

        String urlQuery = getUrlQuery(queries);

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
            System.out.println(e.getMessage());
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