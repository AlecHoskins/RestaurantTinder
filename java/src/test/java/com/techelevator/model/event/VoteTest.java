package com.techelevator.model.event;

import org.testng.Assert;
import org.testng.annotations.Test;

public class VoteTest {
    @Test
    public void voteModelTest() {
        Vote vote = new Vote("test", false);

        Assert.assertEquals("test", vote.getRestaurantId());
        Assert.assertEquals(false, vote.getUpVote());
    }
}
