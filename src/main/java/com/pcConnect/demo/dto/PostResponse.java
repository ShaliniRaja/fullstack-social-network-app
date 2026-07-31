package com.pcConnect.demo.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostResponse {


    private String name;
    private String job;
    private String email;
    private String  post;
    private String id;
    private Long likeCount;
    private Long commentCount;
    private Boolean liked;
}
