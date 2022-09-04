package com.techelevator.modelDto;

import com.techelevator.model.Category;

public class RestaurantDTO {

    private String id;
    private String name;
    private String imageUrl;
    private boolean isClosed;
    private Category[] categories;
    private LocationDTO location;
    private String phone;

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

    public Category[] getCategories() {
        return categories;
    }

    public void setCategories(Category[] categories) {
        this.categories = categories;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public RestaurantDTO(String id, String name, String imageUrl, boolean isClosed, Category[] categories, LocationDTO location, String phone) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.isClosed = isClosed;
        this.categories = categories;
        this.location = location;
        this.phone = phone;
    }

    public RestaurantDTO() {
    }
}
