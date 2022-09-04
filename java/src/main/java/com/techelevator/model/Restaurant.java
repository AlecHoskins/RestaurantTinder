package com.techelevator.model;

public class Restaurant {

    private long id;
    private String name;
    private String address;
    private String citAndState;
    private String imgURL;
    private int zip;
    private String type;

    public Restaurant(Long id, String name, String address, String citAndState, String imgURL, int zip, String type) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.citAndState = citAndState;
        this.imgURL = imgURL;
        this.zip = zip;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCitAndState() {
        return citAndState;
    }

    public void setCitAndState(String citAndState) {
        this.citAndState = citAndState;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }
}