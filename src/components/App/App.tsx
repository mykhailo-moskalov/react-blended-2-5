import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import toast, { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import { Post } from "../../types/post";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });
  const itemsPerPage = 8;
  const totalPages = data ? Math.ceil(data.totalCount / itemsPerPage) : 0;

  function toggleEditModal() {
    setIsEditModalOpen(!isEditModalOpen);
  }
  function toggleCreateModal() {
    setIsCreateModalOpen(!isCreateModalOpen);
  }

  function handleEditPost(post: Post) {
    setEditedPost(post);
  }

  useEffect(() => {
    if (isError) {
      toast.error("Couldn't find any posts!");
    } else if (data?.posts?.length === 0 && debouncedSearchQuery.trim()) {
      toast.error(`No posts found for "${debouncedSearchQuery}"`);
    }
  }, [isError, data, debouncedSearchQuery]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={searchQuery}
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />

          {isSuccess && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          <button className={css.button} onClick={() => toggleCreateModal()}>
            Create post
          </button>
        </header>

        {isLoading && <RingLoader size="100px" color="#d8f3dc" className={css.loader} />}

        {isCreateModalOpen && (
          <Modal onClose={() => toggleCreateModal()}>
            <CreatePostForm onClose={() => toggleCreateModal()} />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal onClose={() => toggleEditModal()}>
            <EditPostForm
              post={editedPost}
              onClose={() => {
                toggleEditModal();
                setEditedPost(null);
              }}
            />
          </Modal>
        )}
        {data !== undefined && data?.posts?.length > 0 && (
          <PostList
            posts={data.posts}
            toggleModal={() => toggleEditModal()}
            toggleEditPost={handleEditPost}
          />
        )}
      </div>
      <Toaster />
    </>
  );
}
