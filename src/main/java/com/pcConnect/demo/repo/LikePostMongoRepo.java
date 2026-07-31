package com.pcConnect.demo.repo;

import com.pcConnect.demo.document.LikePost;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface LikePostMongoRepo extends MongoRepository<LikePost,String> {

   List<LikePost> findByPostId(String postId);

   long countByPostId(String id);
}
