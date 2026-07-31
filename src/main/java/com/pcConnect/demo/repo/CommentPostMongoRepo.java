package com.pcConnect.demo.repo;

import com.pcConnect.demo.document.CommentPost;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface CommentPostMongoRepo extends MongoRepository<CommentPost,String> {

    List<CommentPost> findByPostIdOrderByUpdatedDateDesc(String postId);

    Long countByPostId(String id);
}
