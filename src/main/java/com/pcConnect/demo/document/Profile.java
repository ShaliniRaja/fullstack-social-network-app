package com.pcConnect.demo.document;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
@Document(collection = "profileCollection")
@Data
public class Profile {

    @Id
    private String id;

    private String name;
    private String job;
    private String place;
    private String employer;
    @Indexed(unique = true)
    private String email;
    private String password;

}
