package com.pcConnect.demo.document;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
@Document(collection = "login")
@Data
public class Login {

    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    private String password;

}
