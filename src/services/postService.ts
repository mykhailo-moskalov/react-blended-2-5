import axios from "axios";
import { PostFormValues, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface PostsHTTPResponse {
  posts: Post[];
  totalCount: number;
}

interface APIOptions {
  params: {
    q: string;
    _page: number;
    _limit: number;
  };
}

export const fetchPosts = async (searchText: string, page: number): Promise<PostsHTTPResponse> => {
  const options: APIOptions = {
    params: {
      q: searchText,
      _page: page,
      _limit: 8,
    },
  };

  const resp = await axios.get<Post[]>("/posts", options);

  return {
    posts: resp.data,
    totalCount: parseInt(resp.headers["x-total-count"], 10),
  };
};

export const createPost = async (newPost: PostFormValues): Promise<PostFormValues> => {
  const resp = await axios.post<PostFormValues>("/posts", newPost);

  return resp.data;
};

export const editPost = async (newDataPost: PostFormValues): Promise<PostFormValues> => {
  const resp = await axios.patch<PostFormValues>(`/posts/${newDataPost.id}`, newDataPost);

  return resp.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const resp = await axios.delete<Post>(`/posts/${postId}`);

  return resp.data;
};
