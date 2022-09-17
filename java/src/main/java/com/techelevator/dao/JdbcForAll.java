package com.techelevator.dao;

import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.model.event.Vote;
import com.techelevator.model.restaurant.Category;
import com.techelevator.model.restaurant.Day;
import com.techelevator.model.restaurant.Location;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public abstract class JdbcForAll {

    protected final JdbcTemplate jdbcTemplate;

    public JdbcForAll(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    protected Restaurant mapRowToRestaurant(SqlRowSet result) {
        Restaurant restaurant = new Restaurant();

        restaurant.setId(result.getString("restaurant_id"));
        restaurant.setName(result.getString("restaurant_name"));
        restaurant.setImageUrl(result.getString("image_url"));
        restaurant.setPhone(result.getString("phone"));
        restaurant.setDisplayPhone(result.getString("display_phone"));

        Location location = new Location();
        location.setAddress1(result.getString("address"));
        location.setCity(result.getString("city"));
        location.setState(result.getString("state"));
        location.setZipCode(result.getString("zip"));

        restaurant.setLocation(location);

        return restaurant;
    }

    protected Category mapRowToCategory(SqlRowSet result) {
        Category category = new Category();

        category.setId(result.getLong("category_id"));
        category.setAlias(result.getString("alias"));
        category.setTitle(result.getString("title"));

        return category;
    }

    protected Day mapRowToDay(SqlRowSet result) {
        Day day = new Day();

        day.setId(result.getLong("hours_id"));
        day.setRestaurantId(result.getString("restaurant_id"));
        day.setStart(result.getString("open_time"));
        day.setEnd(result.getString("close_time"));
        day.setDay(result.getInt("day_of_week"));

        return day;
    }

    protected Event mapRowToEvent(SqlRowSet result) {
        Event event = new Event();

        event.setId(result.getLong("event_id"));
        event.setHostId(result.getLong("host_id"));
        event.setEventTitle(result.getString("event_title"));
        event.setEventDayTime(result.getString("event_time"));
        event.setDecisionDeadline(result.getString("decision_time"));

        return event;
    }

    protected Guest mapRowToGuest(SqlRowSet result) {
        Guest guest = new Guest();

        guest.setId((result.getLong(("guest_id"))));
        guest.setEventId(result.getLong(("event_id")));
        guest.setNickname(result.getString("nickname"));
        guest.setUrl(result.getString("url"));
        guest.setUserId(result.getLong("user_id"));

        return guest;
    }

    protected Vote mapRowToVote(SqlRowSet result) {
        Vote vote = new Vote();

        vote.setUpVote(result.getBoolean("up_vote"));
        vote.setRestaurantId(result.getString("restaurant_id"));
        return vote;
    }
}
