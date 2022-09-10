package com.techelevator.dao;

import com.techelevator.model.restaurant.Restaurant;

import java.util.List;

public interface RestaurantDao {

    Restaurant findRestaurantById(String id);

    List<RestaurantDao> findRestaurantByEventId(Long eventId);

    boolean create();

}
