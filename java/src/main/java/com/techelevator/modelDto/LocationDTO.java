package com.techelevator.modelDto;

public class LocationDTO {

    private String address1;
    private String city;
    private String state;
    private long zipCode;

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

    public long getZipCode() {
        return zipCode;
    }

    public void setZipCode(long zipCode) {
        this.zipCode = zipCode;
    }

    public LocationDTO(String address1, String city, String state, long zipCode) {
        this.address1 = address1;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public LocationDTO() {
    }
}
