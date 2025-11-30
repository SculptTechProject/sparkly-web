export interface PostFeedItem {
  id: string;
  projectId: string | null;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  canEdit: boolean;
  canDelete: boolean;
}
