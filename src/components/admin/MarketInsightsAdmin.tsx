import { useMemo, useState } from 'react';
import { useBlog, BlogPost } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, FilePlus2, CheckCircle2, XCircle } from 'lucide-react';

interface PostFormState {
  title: string;
  author: string;
  heroImage: string;
  excerpt: string;
  content: string;
  tags: string;
  publish: boolean;
}

const defaultForm: PostFormState = {
  title: '',
  author: 'TruAssets Research Desk',
  heroImage: '',
  excerpt: '',
  content: '',
  tags: '',
  publish: true,
};

const statusBadge = (status: string) => {
  if (status === 'published') {
    return <Badge className="bg-green-500">Published</Badge>;
  }
  return <Badge variant="secondary">Draft</Badge>;
};

const MarketInsightsAdmin = () => {
  const { posts, addPost, updatePost, deletePost, togglePublish } = useBlog();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formState, setFormState] = useState<PostFormState>(defaultForm);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const query = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query)
      );
    });
  }, [posts, searchTerm]);

  const openNewDialog = () => {
    setEditingPost(null);
    setFormState(defaultForm);
    setIsDialogOpen(true);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormState({
      title: post.title,
      author: post.author,
      heroImage: post.heroImage ?? '',
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags.join(', '),
      publish: post.status === 'published',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formState.title.trim() || !formState.excerpt.trim() || !formState.content.trim()) {
      toast({
        title: 'Missing details',
        description: 'Title, summary, and content are required.',
        variant: 'destructive',
      });
      return;
    }

    const payload = {
      title: formState.title.trim(),
      author: formState.author.trim(),
      heroImage: formState.heroImage.trim() || undefined,
      excerpt: formState.excerpt.trim(),
      content: formState.content.trim(),
      tags: formState.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: formState.publish ? 'published' : 'draft',
    } as const;

    if (editingPost) {
      updatePost(editingPost.id, payload);
      toast({ title: 'Article updated', description: 'Changes have been saved.' });
    } else {
      addPost(payload);
      toast({ title: 'Article created', description: 'Your insight is now part of the library.' });
    }

    setIsDialogOpen(false);
    setEditingPost(null);
    setFormState(defaultForm);
  };

  const handleDelete = (post: BlogPost) => {
    deletePost(post.id);
    toast({ title: 'Article deleted', description: `${post.title} removed from insights.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Market Insights Library</h2>
          <p className="text-muted-foreground">Publish commentary, playbooks, and research for your investors.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Search by title, author, or tag"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="sm:w-64"
          />
          <Button onClick={openNewDialog} className="gap-2">
            <FilePlus2 className="h-4 w-4" />
            New Article
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No posts found. Create your first market insight to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="max-w-xs text-sm">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</div>
                    </TableCell>
                    <TableCell>{statusBadge(post.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {post.tags.length ? post.tags.join(', ') : '—'}
                    </TableCell>
                    <TableCell className="text-sm">{post.author}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(post.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(post)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Article
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => togglePublish(post.id)}>
                            {post.status === 'published' ? (
                              <>
                                <XCircle className="mr-2 h-4 w-4" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(post)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit article' : 'Create new insight'}</DialogTitle>
            <DialogDescription>
              Share timely market commentary, investor playbooks, or portfolio updates with your community.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insight-title">Title</Label>
                <Input
                  id="insight-title"
                  value={formState.title}
                  onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="e.g. Quarterly Update: Managed Office Demand"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insight-author">Author</Label>
                <Input
                  id="insight-author"
                  value={formState.author}
                  onChange={(event) => setFormState((prev) => ({ ...prev, author: event.target.value }))}
                  placeholder="Author name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="insight-image">Hero Image URL</Label>
              <Input
                id="insight-image"
                value={formState.heroImage}
                onChange={(event) => setFormState((prev) => ({ ...prev, heroImage: event.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insight-excerpt">Summary</Label>
              <Textarea
                id="insight-excerpt"
                value={formState.excerpt}
                onChange={(event) => setFormState((prev) => ({ ...prev, excerpt: event.target.value }))}
                placeholder="Two–three sentence elevator pitch for the article."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insight-content">Full Article (Markdown supported)</Label>
              <Textarea
                id="insight-content"
                value={formState.content}
                onChange={(event) => setFormState((prev) => ({ ...prev, content: event.target.value }))}
                rows={10}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insight-tags">Tags</Label>
                <Input
                  id="insight-tags"
                  value={formState.tags}
                  onChange={(event) => setFormState((prev) => ({ ...prev, tags: event.target.value }))}
                  placeholder="Commercial, Portfolio"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insight-publish">Publish Status</Label>
                <select
                  id="insight-publish"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formState.publish ? 'published' : 'draft'}
                  onChange={(event) => setFormState((prev) => ({ ...prev, publish: event.target.value === 'published' }))}
                >
                  <option value="published">Publish immediately</option>
                  <option value="draft">Save as draft</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingPost ? 'Save changes' : 'Publish insight'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketInsightsAdmin;


