import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption?: string;
  likes?: number;
  comments?: number;
  url: string;
}

interface InstagramFeedProps {
  title?: string;
  subtitle?: string;
  posts: InstagramPost[];
  columns?: 3 | 4 | 5;
  showCaption?: boolean;
  showStats?: boolean;
  username?: string;
  ctaButton?: {
    label: string;
    url: string;
  };
  className?: string;
}

export function InstagramFeed({
  title = "Instagram",
  subtitle,
  posts,
  columns = 4,
  showCaption = false,
  showStats = false,
  username = "legendsofcocktails",
  ctaButton = {
    label: "Follow on Instagram",
    url: "https://instagram.com/legendsofcocktails",
  },
  className,
}: InstagramFeedProps) {
  const feedRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  
  useEffect(() => {
    const initAnimations = async () => {
      await animations.initGSAP?.();
      
      if (feedRef.current) {
        animations.scrollReveal(feedRef.current);
      }
    };
    
    initAnimations();
  }, []);
  
  // Grid columns class
  const columnsClass = {
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  }[columns];

  return (
    <div
      ref={feedRef}
      className={cn(
        'py-16 px-6 md:py-24 md:px-8',
        className
      )}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-heading font-display font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-body max-w-3xl mx-auto text-neutral-600">{subtitle}</p>
          )}
          
          {username && (
            <a 
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent font-medium mt-3 hover:underline"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512"
                className="w-4 h-4 mr-2"
                fill="currentColor"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
              @{username}
            </a>
          )}
        </div>
        
        {/* Instagram Grid */}
        <div className={cn(
          'grid gap-4 md:gap-6',
          columnsClass
        )}>
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden rounded-lg"
              onMouseEnter={() => setIsHovering(post.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <img
                src={post.imageUrl}
                alt={post.caption || 'Instagram post'}
                className="w-full aspect-square object-cover transition-transform duration-700 ease-out hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay with caption and stats */}
              <div
                className={cn(
                  'absolute inset-0 bg-black/60 flex flex-col justify-end p-4 transition-opacity duration-300',
                  isHovering === post.id ? 'opacity-100' : 'opacity-0'
                )}
              >
                {showCaption && post.caption && (
                  <p className="text-white text-sm line-clamp-3 mb-2">{post.caption}</p>
                )}
                
                {showStats && (
                  <div className="flex items-center text-white space-x-4">
                    {post.likes !== undefined && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {post.likes}
                      </div>
                    )}
                    
                    {post.comments !== undefined && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                        </svg>
                        {post.comments}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
        
        {/* CTA Button */}
        {ctaButton && (
          <div className="mt-12 text-center">
            <a
              href={ctaButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512"
                className="w-4 h-4 mr-2"
                fill="currentColor"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
              {ctaButton.label}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component to fetch Instagram posts from the API
export function InstagramFeedContainer({
  username = "legendsofcocktails",
  count = 8,
  ...props
}: Omit<InstagramFeedProps, 'posts'> & {
  username?: string;
  count?: number;
}) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call to your backend
        // which would handle the Instagram API interaction
        const response = await fetch(`/api/instagram?username=${username}&count=${count}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        
        // Fallback to sample data for development
        setPosts(sampleInstagramPosts.slice(0, count));
      } finally {
        setLoading(false);
      }
    };
    
    fetchInstagramPosts();
  }, [username, count]);
  
  if (loading) {
    return (
      <div className="py-16 px-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
        <p className="mt-4 text-neutral-600">Loading Instagram feed...</p>
      </div>
    );
  }
  
  if (error && posts.length === 0) {
    return (
      <div className="py-16 px-6 text-center">
        <p className="text-red-500 mb-2">Couldn't load Instagram posts</p>
        <p className="text-neutral-600">{error}</p>
      </div>
    );
  }
  
  return <InstagramFeed posts={posts} username={username} {...props} />;
}

// Sample Instagram posts for development and fallback
const sampleInstagramPosts: InstagramPost[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Signature cocktails for a special event. Cheers to an amazing night! 🍸✨ #LegendsOfCocktails #MixologyMagic',
    likes: 124,
    comments: 18,
    url: 'https://instagram.com/p/sample1',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Crafting the perfect Old Fashioned with a twist. What\'s your favorite classic cocktail? 🥃 #OldFashioned #CocktailCraft',
    likes: 97,
    comments: 23,
    url: 'https://instagram.com/p/sample2',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Behind the bar at last night\'s corporate event. Thanks for having us! #CorporateEvents #Bartending',
    likes: 156,
    comments: 12,
    url: 'https://instagram.com/p/sample3',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1606943932434-2f21e1c54ef2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Fresh ingredients make all the difference. Prepping for tonight\'s masterclass! #CocktailIngredients #FreshIsBest',
    likes: 143,
    comments: 8,
    url: 'https://instagram.com/p/sample4',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1553881651-43348b2ca74e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Mixology meets art. Our new signature cocktail menu launches next week! #CocktailArt #CreativeMixology',
    likes: 210,
    comments: 34,
    url: 'https://instagram.com/p/sample5',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1541661538396-53ba2d051eed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Team building with cocktails - a perfect way to break the ice! #TeamBuilding #CocktailWorkshop',
    likes: 88,
    comments: 7,
    url: 'https://instagram.com/p/sample6',
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1613618966383-e2a5e555069a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Cocktail presentation is just as important as taste. Garnish game strong! #GarnishGame #CocktailDetails',
    likes: 176,
    comments: 19,
    url: 'https://instagram.com/p/sample7',
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c1c1c9308e4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    caption: 'Weekend vibes at our pop-up bar. Thanks to everyone who stopped by! #WeekendVibes #PopUpBar',
    likes: 132,
    comments: 15,
    url: 'https://instagram.com/p/sample8',
  },
];
