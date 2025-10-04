import { fetchPosts } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';

type PostsPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function PostsPage({ params }: PostsPageProps) {
  const queryClient = new QueryClient();

  const searchText = '';
  const page = 1;

  const userId = (await params).slug?.[0];

  const data = await fetchPosts({ searchText, page, userId });

  console.log(data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient initialData={data} userId={userId} />
    </HydrationBoundary>
  );
}
