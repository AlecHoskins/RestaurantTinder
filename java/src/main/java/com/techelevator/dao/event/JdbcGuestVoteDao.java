package com.techelevator.dao.event;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.event.Vote;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcGuestVoteDao extends JdbcForAll implements GuestVoteDao {


    public JdbcGuestVoteDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public boolean addGuestVote(long guestId, String restaurantId) {
        String sql =
                "INSERT INTO guest_vote (guest_id, restaurant_id) " +
                "VALUES (?, ?);";

        int response = jdbcTemplate.update(sql, guestId, restaurantId);

        return response > 0;
    }

    @Override
    public List<Vote> getVotesByGuest(long guestId) {
        String sql =
                "SELECT guest_id, restaurant_id, up_vote FROM guest_vote " +
                "WHERE guest_id = ?;";

        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, guestId);

        List<Vote> votes = new ArrayList<>();

        while(result.next()) {
            votes.add(mapRowToVote(result));
        }
        return votes;
    }

    @Override
    public List<Vote> getVotesByRestaurant(String restaurantId, long eventId) {
        String sql =
                "SELECT guest_id, restaurant_id FROM guest_vote " +
                "WHERE restaurant_id = ?;";

        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, restaurantId);

        List<Vote> votes = new ArrayList<>();

        while(result.next()) {
            votes.add(mapRowToVote(result));
        }
        return votes;
    }

    @Override
    public boolean updateVote(long guestId, Vote updatedVote) {
        return false;
    }

    @Override
    public boolean delete(long guestId, String restaurantId) {
        return false;
    }
}
