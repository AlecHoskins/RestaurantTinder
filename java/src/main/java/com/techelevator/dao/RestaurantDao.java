package com.techelevator.dao;

import com.techelevator.modelDto.RestaurantDTO;

public interface RestaurantDao {

    RestaurantDTO findRestaurantById(String id);

    boolean create();

}
