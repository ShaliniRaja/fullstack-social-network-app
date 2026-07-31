package com.pcConnect.demo.controller;

import com.pcConnect.demo.document.*;
import com.pcConnect.demo.dto.PostCardDto;
import com.pcConnect.demo.dto.PostResponse;
import com.pcConnect.demo.service.PsConnectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@Slf4j
@RestController
@RequestMapping("/api/version1")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PsConnectController {

    private final PsConnectService psConnectService;

    @PostMapping("/saveRequest")
    public Psconnect saveRequest(@RequestBody Psconnect psDocument) {
        System.out.println("psDocument "+psDocument.getName());
        return psConnectService.saveProduct(psDocument);
    }
    @PutMapping("/updateRequest")
    public Psconnect updateRequest(@RequestBody Psconnect psDocument) {
        System.out.println("psDocument "+psDocument.getName());
        return psConnectService.saveProduct(psDocument);
    }

    @PostMapping("/saveProfile")
    public Profile saveRequest(@RequestBody Profile profile) {
        System.out.println("Profile "+profile);
         return psConnectService.saveProfile(profile);

    }
    @PutMapping("/updateProfile")
    public Profile updateProfile(@RequestBody Profile profile) {
        System.out.println("Profile "+profile);
        return psConnectService.saveProfile(profile);
    }

    @GetMapping("/getProfile")
    public List<Profile> getAllProfile() {
        System.out.println("get all Profile ");
        return psConnectService.getAllprofile();
    }

    @GetMapping("/{id}")
    public Profile getAllProfileById(@PathVariable String id) {
        System.out.println("get Profile by Id "+ id);
        return psConnectService.getprofileById(id);
    }

    @PostMapping("/savePost")
    public CreatePost savePost(@RequestBody CreatePost createPost) {
        System.out.println("createPost "+createPost);
        return psConnectService.savePost(createPost);
    }

    @PutMapping("/editPost")
    public CreatePost editPost(@RequestBody CreatePost createPost) {
        System.out.println("createPost "+createPost);
        return psConnectService.savePost(createPost);
    }

    @DeleteMapping("/deletePost/{id}")
    public void deletePost(@PathVariable String id) {
        System.out.println("createPost "+id);
         psConnectService.deletePost(id);
    }

    @GetMapping("/getAllPost/{email}")
    public List<PostCardDto> getAllPost(@PathVariable String email) {
        System.out.println("get all createPost ");
        return psConnectService.getAllPost(email);
    }

    @PostMapping("/saveLike")
    public PostCardDto saveLike(@RequestBody LikePost likePost) {
        System.out.println("likePost "+likePost);
        return psConnectService.saveLikePost(likePost);
    }

    @DeleteMapping("/deleteLike/{id}")
    public PostCardDto deleteLike(@PathVariable String id) {
        System.out.println("id "+id);
        return psConnectService.deleteLikePost(id);
    }

    @PostMapping("/saveComment")
    public CommentPost saveComment(@RequestBody CommentPost commentPost) {
        System.out.println("commentPost "+commentPost);
        return psConnectService.saveCommentPost(commentPost);
    }

    @PutMapping("/editComment")
    public CommentPost editComment(@RequestBody CommentPost commentPost) {
        System.out.println("commentPost "+commentPost);
        return psConnectService.saveCommentPost(commentPost);
    }

    @GetMapping("/getComment/{id}")
    public List<CommentPost> getComment(@PathVariable String id) {
        System.out.println("commentPost "+id);
        return psConnectService.getCommentByPostId(id);
    }

    @DeleteMapping("/deleteComment/{id}")
    public void deleteComment(@PathVariable String id) {
        System.out.println("commentPost "+id);
        psConnectService.deleteCommentById(id);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<PostResponse>> search(
            @PathVariable String keyword){

        return ResponseEntity.ok(psConnectService.search(keyword));

    }
    @GetMapping("/trending")
    public Set<SearchHistory> trending() {

        return psConnectService.getTrending();

    }

}
