package com.pcConnect.demo.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "searchHistory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchHistory {

    @Id
    private String id;

    private String keyword;

    private Long count;

    @CreatedDate
    private LocalDateTime updatedDate;
}
