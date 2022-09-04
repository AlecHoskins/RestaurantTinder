package com.techelevator.modelDto;

public class SearchDTO {

    private long total;
    private RestaurantDTO[] businesses;

    @Override
    public String toString() {
        String businesses = "Total: " + total + "\n";
        for(RestaurantDTO restaurant : this.businesses) {
            businesses += restaurant.getName();
            businesses += "\n";
        }

        return businesses;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public RestaurantDTO[] getBusinesses() {
        return businesses;
    }

    public void setBusinesses(RestaurantDTO[] businesses) {
        this.businesses = businesses;
    }

    public SearchDTO(long total, RestaurantDTO[] businesses) {
        this.total = total;
        this.businesses = businesses;
    }

    public SearchDTO() {
    }
}
