package com.techelevator.controller;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.techelevator.service.YelpBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class YelpController {
    @Autowired
    YelpBusinessService yelpBusinessService;

    //for testing
    public static void main(String[] args) throws UnirestException {
        YelpBusinessService yelpBusinessService = new YelpBusinessService();
        yelpBusinessService.getBusinessesByTermAndLocation("ready ,set,go", "keller");
    }
}