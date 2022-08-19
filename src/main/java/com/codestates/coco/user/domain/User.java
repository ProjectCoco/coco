package com.codestates.coco.user.domain;

import com.codestates.coco.contents.domain.Content;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    private String providerId;
    private ProviderType providerType;
    // mongodb enum
    private RoleType roleType;

    @DocumentReference
    private List<Content> contentFavor;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(String email, String password, String username, String groupInfo, String profileImg, RoleType roleType, ProviderType providerType, String providerId) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.groupInfo = groupInfo;
        this.profileImg = profileImg;
        this.roleType = roleType;
        this.providerType = providerType;
        this.providerId = providerId;
        this.contentFavor = new ArrayList<>();
    }

    public User(String email, String password, String username, String groupInfo, String profileImg) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.groupInfo = groupInfo;
        this.profileImg = profileImg;
        this.roleType = RoleType.USER;
        this.contentFavor = new ArrayList<>();
    }


    public User(String email, String username, String groupInfo, String profileImg) {
        this.email = email;
        this.username = username;
        this.groupInfo = groupInfo;
        this.profileImg = profileImg;
    }


/*    public List<String> roleList() {
        if (this.role.length() > 0) {
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }*/

    public void update(String groupInfo, String profileImg, String username) {
        this.groupInfo = groupInfo;
        this.profileImg = profileImg;
        this.username = username;
    }

    public void addContentFavor(Content content) { this.contentFavor.add(content); }

    public void removeContentFavor(Content content) {
        List<Content> collect = this.contentFavor.stream().filter(c -> c.get_id().equals(content.get_id())).collect(Collectors.toList());
        this.contentFavor.remove(collect.get(0));
    }
}
