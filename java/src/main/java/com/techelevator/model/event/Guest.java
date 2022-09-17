package com.techelevator.model.event;

import java.util.List;

public class Guest {

    private long id;
    private long eventId;
    private String nickname;
    private String url;
    private long userId;
    private List<Vote> vote;

    @Override
    public String toString() {
        return (
                "id: " + id + "\n" +
                "eventId: " + eventId + "\n" +
                "nickname: " + nickname + "\n" +
                "url: " + url + "\n" +
                "userId: " + userId + "\n"
                );
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getEventId() {
        return eventId;
    }

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public List<Vote> getVote() {
        return vote;
    }

    public void setVote(List<Vote> vote) {
        this.vote = vote;
    }

    public Guest(long id, long eventId, String nickname, String inviteUrl, long userId, List<Vote> vote) {
        this.id = id;
        this.eventId = eventId;
        this.nickname = nickname;
        this.url = inviteUrl;
        this.userId = userId;
        this.vote = vote;
    }

    public Guest() {
    }
}
