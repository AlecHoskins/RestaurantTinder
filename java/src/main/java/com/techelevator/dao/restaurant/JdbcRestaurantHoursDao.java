package com.techelevator.dao.restaurant;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.restaurant.Day;
import com.techelevator.model.restaurant.Hours;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcRestaurantHoursDao extends JdbcForAll implements RestaurantHoursDao {
    public JdbcRestaurantHoursDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public List<Long> addAllHours(List<Hours> hours, String restaurantId) {
        List<Long> hoursIds = new ArrayList<>();

        for(Hours hour: hours) {
            for (Day day : hour.getOpen()) {
                long hoursId = addDay(day, restaurantId);
                if (hoursId >= 1) {
                    hoursIds.add(hoursId);
                }
            }
        }
        return hoursIds;
    }

    @Override
    public long addDay(Day day, String id) {
        String sql =
                "INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time) " +
                "VALUES (?, ?, ?, ?) " +
                "RETURNING hours_id;";
        Long hoursId = jdbcTemplate.queryForObject(sql, Long.class,
                id, day.getDay(), day.getStart(), day.getEnd());

        return hoursId != null ? hoursId : -1;
    }

    @Override
    public List<Day> getHoursByRestaurant(String restaurantId) {
        String sql =
                "SELECT * FROM restaurant_hours " +
                "WHERE restaurant_id = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, restaurantId);

        List<Day> days = new ArrayList<>();

        while(result.next()) {
            days.add(mapRowToDay(result));
        }

        return days;
    }

    @Override
    public boolean delete(long id) {
        String deleteSql =
                "DELETE FROM restaurant_hours " +
                "WHERE hours_id = ?;";
        int numberOfRowsDeleted = jdbcTemplate.update(deleteSql, id);

        return numberOfRowsDeleted == 1;
    }
}
