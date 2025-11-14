import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calculator, BookOpen, BarChart3, ArrowRight } from "lucide-react";
import { useBlog, BlogPost } from "@/contexts/BlogContext";

const InvestorTools = () => {
  const navigate = useNavigate();
  const { publishedPosts } = useBlog();
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const tools = [
    {
      key: "roi",
      icon: Calculator,
      title: "ROI Calculator",
      description: "Calculate potential returns on your real estate investments with our advanced calculator.",
      action: "Calculate Now",
      color: "bg-primary"
    },
    {
      key: "insights",
      icon: BookOpen,
      title: "Market Insights Blog",
      description: "Stay updated with latest market trends, investment tips, and expert analysis.",
      action: "Read Articles",
      color: "bg-accent-green"
    },
    {
      key: "comparison",
      icon: BarChart3,
      title: "Property Comparison",
      description: "Compare multiple properties side-by-side to make informed investment decisions.",
      action: "Compare Properties",
      color: "bg-accent-gold"
    }
  ] as const;

  const latestInsights = useMemo(() => publishedPosts.slice(0, 3), [publishedPosts]);

  const handleToolAction = (key: (typeof tools)[number]["key"]) => {
    switch (key) {
      case "roi":
        navigate("/roi-calculator");
        break;
      case "insights":
        document.getElementById("market-insights")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "comparison": {
        const section = document.getElementById("property-comparison");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/#property-comparison");
        }
        break;
      }
    }
  };

  const renderContent = (content: string) => {
    return content.split(/\n\s*\n/).map((paragraph, index) => (
      <p key={index} className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
        {paragraph}
      </p>
    ));
  };

  return (
    <section className="section-padding bg-secondary" id="investor-tools">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Investor <span className="text-primary">Tools</span> & Resources
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and insights to help you make smarter investment decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div key={index} className="feature-card p-8 text-center group hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {tool.description}
                </p>
                
                <Button
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  onClick={() => handleToolAction(tool.key)}
                >
                  {tool.action}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Featured Blog Posts */}
        <div className="mt-16" id="market-insights">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Latest Market Insights
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {latestInsights.length === 0 ? (
              <div className="bg-card p-6 rounded-lg shadow-md text-center text-muted-foreground">
                Market insights will appear here once you publish an article from the admin dashboard.
              </div>
            ) : (
              latestInsights.map((post) => (
                <div key={post.id} className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'} · {post.author}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-muted px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setActivePost(post)}>
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!activePost} onOpenChange={(open) => !open && setActivePost(null)}>
        <DialogContent className="sm:max-w-2xl">
          {activePost && (
            <>
              <DialogHeader>
                <DialogTitle>{activePost.title}</DialogTitle>
                <DialogDescription>
                  {activePost.publishedAt ? new Date(activePost.publishedAt).toLocaleString() : 'Draft'} · {activePost.author}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {activePost.heroImage && (
                  <img
                    src={activePost.heroImage}
                    alt={activePost.title}
                    className="h-48 w-full rounded-md object-cover"
                  />
                )}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {activePost.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {renderContent(activePost.content)}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default InvestorTools;