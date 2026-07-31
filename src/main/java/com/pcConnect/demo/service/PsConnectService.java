package com.pcConnect.demo.service;

import com.pcConnect.demo.document.*;
import com.pcConnect.demo.dto.PostCardDto;
import com.pcConnect.demo.dto.PostResponse;
import com.pcConnect.demo.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PsConnectService {

    private final PsConnectMongoRepo psConnectMongoRepo;
    private final ProfileMongoRepo profileMongoRepo;
    private final CreatePostMongoRepo createPostMongoRepo;
    private final CommentPostMongoRepo commentPostMongoRepo;
    private final LikePostMongoRepo likePostMongoRepo;
    private final SearchHistoryMongoRepo searchHistoryMongoRepo;

    public Psconnect saveProduct(Psconnect product) {
        return psConnectMongoRepo.save(product);
    }

    public Profile saveProfile(Profile profile) {
        return profileMongoRepo.save(profile);
    }

    public List<Profile> getAllprofile() {
        return profileMongoRepo.findAll();
    }

    public Profile getprofileById(String id) {
        return profileMongoRepo.findByEmail(id).orElseThrow();
    }

    public CreatePost savePost(CreatePost createPost) {
        return createPostMongoRepo.save(createPost);
    }

    public void     deletePost(String id) {
        createPostMongoRepo.deleteById(id);
    }

    public List<PostCardDto> getAllPost(String email) {
        System.out.println(">email "+email);
        return createPostMongoRepo.findAllByOrderByUpdatedDateDesc().stream()
                .map(post->{
                    PostCardDto postCardDto = new PostCardDto();
                    postCardDto.setPostId(post.getId());
                    postCardDto.setPost(post.getPost());
                    postCardDto.setEmailId(post.getEmail());
                    Profile profile = getprofileById(post.getEmail());
                    postCardDto.setName(profile.getName());
                    postCardDto.setJob(profile.getJob());
                    getLikeDetails(post.getId(),email,postCardDto);
                    postCardDto.setCommentCount((long) getCommentByPostId(post.getId()).size());
                    return postCardDto;
                }).collect(Collectors.toList());
    }

    private void getLikeDetails(String id, String email, PostCardDto postCardDto) {

        List<LikePost> likepostList = likePostMongoRepo.findByPostId(id);
        postCardDto.setLiked(false);
        if(!likepostList.isEmpty()){
            likepostList.stream().filter(likePost -> email.equals(likePost.getEmail()))
                    .forEach(likePost -> {
                        postCardDto.setId(likePost.getId());
                        postCardDto.setLiked(true);
                    });
        }else {
            postCardDto.setLiked(false);
        }
        postCardDto.setLikeCount((long) likepostList.size());

    }

    public PostCardDto saveLikePost(LikePost likePost) {

        LikePost likePost1 =  LikePost.builder().postId(likePost.getPostId())
                .email(likePost.getEmail())
                .build();
        likePostMongoRepo.save(likePost1);
        PostCardDto postCardDto = new PostCardDto();
        getLikeDetails(likePost.getPostId(), likePost.getEmail(), postCardDto);
        postCardDto.setPostId(likePost.getPostId());
        return postCardDto;
    }

    public CommentPost saveCommentPost(CommentPost commentPost) {
        return commentPostMongoRepo.save(commentPost);
    }

    public PostCardDto deleteLikePost(String id) {
        LikePost likePost = likePostMongoRepo.findById(id).orElseThrow();
        likePostMongoRepo.deleteById(id);
        PostCardDto postCardDto = new PostCardDto();
        getLikeDetails(likePost.getPostId(), likePost.getEmail(), postCardDto);
        postCardDto.setPostId(likePost.getPostId());
        return postCardDto;
    }

    public List<CommentPost> getCommentByPostId(String postId) {
        return commentPostMongoRepo.findByPostIdOrderByUpdatedDateDesc(postId);
    }

    public void deleteCommentById(String commentId) {
        commentPostMongoRepo.deleteById(commentId);
    }


    public List<PostResponse> search(String keyword) {

        List<Profile> profiles = profileMongoRepo.searchProfile(keyword);

        List<String> emails = profiles.stream()
                .map(Profile::getEmail)
                .toList();

        List<PostResponse> posts = createPostMongoRepo.searchPosts(emails, keyword);

        saveSearch(keyword);

        return posts.stream()
                .map(this::convertToResponse)
                .toList();
    }

    private PostResponse convertToResponse(PostResponse post) {

        PostResponse response = new PostResponse();

        response.setId(post.getId());
        response.setEmail(post.getEmail());
        response.setPost(post.getPost());

        Optional<Profile> profile = profileMongoRepo.findByEmail(post.getEmail());

        if (profile.isPresent()) {

            response.setName(profile.get().getName());
            response.setJob(profile.get().getJob());

        }

        response.setLikeCount( likePostMongoRepo.countByPostId(post.getId()));
        response.setCommentCount(commentPostMongoRepo.countByPostId(post.getId()));

        return response;
    }

    public void saveSearch(String keyword) {

        Optional<SearchHistory> history =
                searchHistoryMongoRepo.findByKeywordIgnoreCase(keyword);

        if (history.isPresent()) {

            SearchHistory search = history.get();
            search.setCount(search.getCount() + 1);
            searchHistoryMongoRepo.save(search);

        } else {

            SearchHistory search = new SearchHistory();

            search.setKeyword(keyword);
            search.setCount(1L);
            searchHistoryMongoRepo.save(search);

        }
    }

    public Set<SearchHistory> getTrending() {
        return searchHistoryMongoRepo.findTop5ByOrderByCountDescUpdatedDateDesc();
    }
}

