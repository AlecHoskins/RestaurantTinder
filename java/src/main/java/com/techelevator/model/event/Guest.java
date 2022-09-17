package com.techelevator.model.event;

import java.util.List;

public class Guest {

    private long id;
    private long eventId;
    private String nickname;
    private String inviteUrl;
    private Long userId;
    private List<Vote> vote;

    @Override
    public String toString() {
        return (
                "id: " + id + "\n" +
                "eventId: " + eventId + "\n" +
                "nickname: " + nickname + "\n" +
                "url: " + inviteUrl + "\n" +
                "userId: " + userId + "\n" +
                "votes: " + vote + "\n"
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

    public String getInviteUrl() {
        return inviteUrl;
    }

    public void setInviteUrl(String inviteUrl) {
        this.inviteUrl = inviteUrl;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Vote> getVote() {
        return vote;
    }

    public void setVote(List<Vote> vote) {
        this.vote = vote;
    }

    public Guest(long id, long eventId, String nickname, String inviteUrl, Long userId, List<Vote> vote) {
        this.id = id;
        this.eventId = eventId;
        this.nickname = nickname;
        this.inviteUrl = inviteUrl;
        this.userId = userId;
        this.vote = vote;
    }

    public Guest() {
    }
}
