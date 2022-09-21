package com.techelevator.model.restaurant;

import org.testng.Assert;
import org.testng.annotations.Test;

public class LocationTest {
    @Test
    public void locationModelTest() {
        Location location = new Location("address", "city", "state", "zip");

        Assert.assertEquals("address", location.getAddress1());
        Assert.assertEquals("city", location.getCity());
        Assert.assertEquals("state", location.getState());
        Assert.assertEquals("zip", location.getZipCode());
    }
}
