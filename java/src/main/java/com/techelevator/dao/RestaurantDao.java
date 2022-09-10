package com.techelevator.dao;

import com.techelevator.modelDto.RestaurantDTO;

import java.util.List;

public interface RestaurantDao {

    RestaurantDTO findRestaurantById(String id);

    List<RestaurantDao> findRestaurantByEventId(Long eventId);

    boolean create();

}
