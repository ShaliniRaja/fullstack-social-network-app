package com.pcConnect.demo.document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
@Document(collection = "psconnectCollection")
@Data
public class Psconnect {

    @Id
    private String id;

    private String name;
    private Boolean isLiked;
    private String comment;

}
