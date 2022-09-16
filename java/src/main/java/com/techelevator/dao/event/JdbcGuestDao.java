package com.techelevator.dao.event;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.event.Guest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcGuestDao extends JdbcForAll implements GuestDao {

    public JdbcGuestDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public long addGuest(Guest newGuest, long eventId) {

        String addGuestSql =
                "INSERT INTO guest (event_id, url, nickname) " +
                "VALUES(?, ?, ?) " +
                "RETURNING guest_id";


        Long id = jdbcTemplate.queryForObject(addGuestSql, Long.class,
                eventId, newGuest.getInviteUrl(), newGuest.getNickname());
        return id != null ? id : -1;
    }

    @Override
    public Guest getGuestById(long id) {
        String sql =
                "SELECT guest_id, event_id, nickname, url, user_id FROM guest " +
                "WHERE guest_id = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, id);

        if(result.next()) {
            return mapRowToGuest(result);
        }

        return null;
    }

    @Override
    public List<Guest> getEventGuests(long eventId) {
        String sql =
                "SELECT guest_id, event_id, nickname, url, user_id FROM guest" +
                "WHERE event_id = ?;";

        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, eventId);

        List<Guest> guests = new ArrayList<>();

        while(result.next()) {
            guests.add(mapRowToGuest(result));
        }
        return guests;
    }

    @Override
    public boolean updateGuest(Guest updatedGuest) {
        return false;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }
}
