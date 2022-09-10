package com.techelevator.modelDto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LocationDTO {

    private String address1;
    private String city;
    private String state;
    @JsonProperty("zip_code")
    private String zipCode;

    @Override
    public String toString() {
        String info = "address1: " + address1;
        info += "\n";
        info += "city: " + city;
        info += "\n";
        info += "state: " + state;
        info += "\n";
        info += "zipCode: " + zipCode;
        info += "\n";

        return info;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public LocationDTO(String address1, String city, String state, String zipCode) {
        this.address1 = address1;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public LocationDTO() {
    }
}
