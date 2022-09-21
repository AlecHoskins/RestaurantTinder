package com.techelevator.model.event;

import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

public class GuestTest {
    @Test
    public void guestModelTest() {
        List<Vote> voteList = new ArrayList<>();
        Vote vote = new Vote();
        voteList.add(vote);

        Guest guest = new Guest(0, 1, "Mo", "invite", (long)2, voteList);

        Assert.assertEquals(0, guest.getId());
        Assert.assertEquals(1, guest.getEventId());
        Assert.assertEquals("Mo", guest.getNickname());
        Assert.assertEquals("invite", guest.getInviteUrl());
        Assert.assertEquals(2, guest.getUserId());
        Assert.assertEquals(voteList, guest.getVote());
    }
}
