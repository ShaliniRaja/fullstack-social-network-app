package com.pcConnect.demo.repo;

import com.pcConnect.demo.document.CreatePost;
import com.pcConnect.demo.dto.PostResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface CreatePostMongoRepo extends MongoRepository<CreatePost,String> {
    List<CreatePost> findAllByOrderByUpdatedDateDesc();

    @Query("{'$or':[" +
            "{'name':{$regex:?0,$options:'i'}}," +
            "{'job':{$regex:?0,$options:'i'}}," +
            "{'email':{$regex:?0,$options:'i'}}," +
            "{'post':{$regex:?0,$options:'i'}}" +
            "]}")
    List<PostResponse> search(String keyword);

    @Query("{'$or':[" +
            "{'email':{$in:?0}}," +
            "{'post':{$regex:?1,$options:'i'}}" +
            "]}")
    List<PostResponse> searchPosts(List<String> emails, String keyword);
}


