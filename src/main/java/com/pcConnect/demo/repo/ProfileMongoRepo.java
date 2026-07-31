package com.pcConnect.demo.repo;

import com.pcConnect.demo.document.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProfileMongoRepo extends MongoRepository<Profile,String> {

    @Query("{'$or':[" +
            "{'name':{$regex:?0,$options:'i'}}," +
            "{'job':{$regex:?0,$options:'i'}}," +
            "{'email':{$regex:?0,$options:'i'}}" +
            "]}")
    List<Profile> searchProfile(String keyword);


    Optional<Profile> findByEmail(String id);
}
