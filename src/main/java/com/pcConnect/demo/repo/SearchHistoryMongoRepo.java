package com.pcConnect.demo.repo;

import com.pcConnect.demo.document.CommentPost;
import com.pcConnect.demo.document.SearchHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface SearchHistoryMongoRepo extends MongoRepository<SearchHistory,String> {

    Optional<SearchHistory> findByKeywordIgnoreCase(String keyword);

    Set<SearchHistory> findTop5ByOrderByCountDescUpdatedDateDesc();
}
