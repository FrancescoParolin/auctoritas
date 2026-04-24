export interface Article {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  category: string
  publishedAt: string
  author: string
  tags: string[]
  featured: boolean
  readTime: number
}

export interface Topic {
  id: string
  title: string
  description: string
  relatedArticleSlug?: string
  createdAt: string
  commentCount: number
  isActive: boolean
  tags: string[]
}

export interface Comment {
  id: string
  topicId: string
  parentId?: string
  nickname: string
  content: string
  createdAt: string
  isApproved: boolean
}

export interface CommentWithReplies extends Comment {
  replies: Comment[]
}
