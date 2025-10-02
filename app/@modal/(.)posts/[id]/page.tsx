import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import PostPreviewClient from './PostPreview.client';
// import { fetchPostById } from '@/lib/api';

export default async function PostPreview({ params }: PostDetailsProps) {
  return (
    <HydrationBoundary state={dehydrate()}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
