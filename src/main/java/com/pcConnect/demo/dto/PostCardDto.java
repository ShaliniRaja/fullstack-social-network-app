package com.pcConnect.demo.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostCardDto {

    private String postId;
    private String name;
    private String job;
    private String emailId;
    private String  post;
    private Long likeCount;
    private Long commentCount;
    private Boolean liked;
    private String id;
}
