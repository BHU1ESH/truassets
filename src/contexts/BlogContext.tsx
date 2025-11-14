import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type BlogStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  heroImage?: string;
  tags: string[];
  status: BlogStatus;
  publishedAt?: string | null;
  updatedAt: string;
}

interface BlogContextType {
  posts: BlogPost[];
  publishedPosts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'status' | 'publishedAt' | 'updatedAt'> & { status?: BlogStatus }) => void;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  togglePublish: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_KEY = 'truassets_blog_posts';

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Top Commercial Micro-Markets to Watch in 2025',
    excerpt:
      'Office absorption is back with a bang. We break down the micromarkets delivering double-digit rental escalations and resilient vacancy levels.',
    content:
      'India\'s Grade-A commercial segment continues to surprise on the upside...\n\n**Key Highlights**\n- Bengaluru ORR remains supply-constrained\n- Pune IT corridor seeing steady rental appreciation\n- Managed offices gaining traction among mid-sized occupiers\n\nInvestors focused on stabilized assets with strong credit tenants can target 12-14% IRR with prudent leverage.',
    author: 'TruAssets Research Desk',
    heroImage:
      'https://images.unsplash.com/photo-1529429617124-aee8893268be?auto=format&fit=crop&w=1200&q=80',
    tags: ['Commercial', 'Market Outlook'],
    status: 'published',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'blog-2',
    title: 'Why Fractional Ownership Beats Fixed Deposits in 2025',
    excerpt:
      'With post-tax FD yields slipping below inflation, learn how stabilized real-estate assets can help preserve capital and grow wealth.',
    content:
      'Traditional fixed income instruments are delivering 5-6% post-tax returns, leaving little room for wealth creation...\n\nFractional real estate offers:\n1. Stable monthly payouts backed by rent\n2. Tangible asset security\n3. Indexed escalations hedging inflation\n\nBlended IRRs between 11-13% make this an attractive core holding for high-income professionals.',
    author: 'Meera Iyer, Senior Advisor',
    heroImage:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    tags: ['Investor Education'],
    status: 'published',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'blog-3',
    title: 'How to Evaluate Cash Flow Quality Before You Invest',
    excerpt:
      'Understand the metrics that matter—WALE, rent escalation covenants, vacancy buffers—and stress test your returns like the pros.',
    content:
      'Cash flow durability is the cornerstone of any real-estate underwriting. Before you commit capital, evaluate:\n\n- **Weighted Average Lease Expiry (WALE):** Longer WALE provides better visibility.\n- **Escalation Clauses:** Check for contractual annual escalations of 4-5%.\n- **Vacancy Buffers:** Model at least three months of downtime every lease cycle.\n\nSeasoned investors layer rental income with appreciation upside to build resilient portfolios.',
    author: 'Anil Suri, Portfolio Manager',
    heroImage:
      'https://images.unsplash.com/photo-1462899006636-339e08d1844e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Due Diligence', 'Playbook'],
    status: 'draft',
    publishedAt: null,
    updatedAt: new Date().toISOString(),
  },
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored posts:', error);
        setPosts(SAMPLE_POSTS);
      }
    } else {
      setPosts(SAMPLE_POSTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_POSTS));
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  }, [posts]);

  const addPost: BlogContextType['addPost'] = (postData) => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...postData,
      id: `blog-${Date.now()}`,
      status: postData.status ?? 'draft',
      publishedAt: postData.status === 'published' ? now : null,
      updatedAt: now,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost: BlogContextType['updatePost'] = (id, updates) => {
    const now = new Date().toISOString();
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              ...updates,
              updatedAt: now,
              publishedAt:
                updates.status === 'published'
                  ? post.publishedAt ?? now
                  : updates.status === 'draft'
                  ? null
                  : post.publishedAt,
            }
          : post,
      ),
    );
  };

  const deletePost: BlogContextType['deletePost'] = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const togglePublish: BlogContextType['togglePublish'] = (id) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post;
        const isPublished = post.status === 'published';
        return {
          ...post,
          status: isPublished ? 'draft' : 'published',
          publishedAt: isPublished ? null : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const publishedPosts = useMemo(() => posts.filter((post) => post.status === 'published'), [posts]);

  const value: BlogContextType = {
    posts,
    publishedPosts,
    addPost,
    updatePost,
    deletePost,
    togglePublish,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};


