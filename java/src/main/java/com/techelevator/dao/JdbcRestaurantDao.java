package com.techelevator.dao;

import com.techelevator.modelDto.RestaurantDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JdbcRestaurantDao implements RestaurantDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcRestaurantDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public RestaurantDTO findRestaurantById(String restaurantId) {

        String sql = "SELECT * FROM restaurant WHERE restaurant_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, restaurantId);

        return null;
    }

    @Override
    public List<RestaurantDao> findRestaurantByEventId(Long eventId) {
        return null;
    }

    @Override
    public boolean create() {
        return false;
    }

    private RestaurantDTO mapRowToRestaurant(SqlRowSet rs) {
        RestaurantDTO restaurant = new RestaurantDTO();
        restaurant.setId(rs.getString("restaurant_id"));
        restaurant.setName(rs.getString("restaurant_name"));
        restaurant.setImageUrl(rs.getString("image_url"));
        restaurant.setPhone(rs.getString("phone"));
        restaurant.setDisplayPhone(rs.getString("display_phone"));
        return restaurant;
    }
}