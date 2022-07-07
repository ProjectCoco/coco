package com.codestates.coco.user.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;

    @Indexed(unique = true)
    private String username;

    private String groupInfo;

    private String profileImg;

    private String role;

    private List<String> contentFavor;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(String email, String password, String username, String groupInfo, String profileImg) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.groupInfo = groupInfo;
        this.profileImg = profileImg;
        this.role = "ROLE_USER";
        this.contentFavor = new ArrayList<>();
    }

    public User(String email, String username, String groupInfo, String profileImg) {
        this.email = email;
        this.username = username;
        this.groupInfo = groupInfo;
        this.profileImg = profileImg;
    }


    public List<String> roleList() {
        if (this.role.length() > 0) {
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }

    public void update(String groupInfo, String profileImg) {
        this.groupInfo = groupInfo;
        this.profileImg = profileImg;
    }

    public void addContentFavor(String contentId) { this.contentFavor.add(contentId); }

    public void removeContentFavor(String contentId) { this.contentFavor.remove(contentId); }
}
