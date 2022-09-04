package com.techelevator.service;

import com.mashape.unirest.http.HttpResponse;
        import com.mashape.unirest.http.Unirest;
        import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.Data;
import org.springframework.stereotype.Service;

@Data
@Service
public class YelpBusinessService {

    static final String API_KEY = "Bearer iaMEHWlcw7lHm7MnaRb88lv1rcor5PPvUY7DLToMpAAaqx9TF4mW7bWITQbjaZyTp-qRM7IKqNP7bIzgy93gIUx6hJfxabcnAoumPcpP-GwPXX8EQADNFzu0osMUY3Yx";
    static final String API_BUSINESSES_BASE_URL ="https://api.yelp.com/v3/businesses/";

    /********************************** SEARCHES BUSINESSES WITH SEARCH TERM AND LOCATION *******************************/
    public void getBusinessesByTermAndLocation(String searchTerm, String location) throws UnirestException {
        Unirest.setTimeouts(0, 0);
        searchYelp(API_BUSINESSES_BASE_URL+"search?term="+searchTerm+"&location="+location);
    }

    /********************************** GETS THE DETAILS OF A BUSINESSES BY ID *******************************/
    //business id will appear as one of first properties in the business json in business search
    public void getBusinessById(String businessId) throws UnirestException {
        Unirest.setTimeouts(0, 0);
        searchYelp(API_BUSINESSES_BASE_URL+businessId);
    }

    /************** METHOD THAT ACTUALLY SEARCHES YELP WITH QUERY PASSED FROM OTHER METHODS *******************/
    private void searchYelp(String urlQuery) throws UnirestException {
        urlQuery = urlQuery.replaceAll("\\s",""); //spaces are illegal in url search
        HttpResponse<String> response = Unirest.get(urlQuery)
                .header("Authorization", API_KEY)
                .asString();
        System.out.println("\n------------------------------------\n"+response.getBody());
    }
}
