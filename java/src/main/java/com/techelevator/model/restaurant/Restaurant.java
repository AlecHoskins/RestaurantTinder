package com.techelevator.model.restaurant;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Restaurant {

    private String id;
    private String name;
    @JsonProperty("image_url")
    private String imageUrl;
    @JsonProperty("is_closed")
    private boolean isClosed;
    private List<Category> categories;
    private Location location;
    private String phone;
    @JsonProperty("display_phone")
    private String displayPhone;
    private List<Day> hours;

    @Override
    public String toString() {

        String info = "id: " + id;
        info += "\n";
        info += "name: " + name;
        info += "\n";
        info += "imageUrl: " + imageUrl;
        info += "\n";
        info += "isClosed: " + isClosed;
        info += "\n";
        info += "categories: " + categories;
        info += "\n";
        info += "location: " + location;
        info += "\n";
        info += "phone: " + phone;
        info += "\n";
        info += "displayPhone: " + displayPhone;
        info += "\n";
        info += "hours: " + hours;

        return info;
    }

    public String getDisplayPhone() {
        return displayPhone;
    }

    public void setDisplayPhone(String displayPhone) {
        this.displayPhone = displayPhone;
    }

    public List<Day> getHours() {
        return hours;
    }

    public void setHours(List<Day> hours) {
        this.hours = hours;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isClosed() {
        return isClosed;
    }

    public void setClosed(boolean closed) {
        isClosed = closed;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Restaurant(String id, String name, String imageUrl, boolean isClosed, List<Category> categories, Location location, String phone, String displayPhone, List<Day> hours) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.isClosed = isClosed;
        this.categories = categories;
        this.location = location;
        this.phone = phone;
        this.displayPhone = displayPhone;
        this.hours = hours;
    }

    public Restaurant() {
    }
}
