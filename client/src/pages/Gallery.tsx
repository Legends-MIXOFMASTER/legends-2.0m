import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Upload, Edit2 } from "lucide-react";

// Temporary mock data for gallery images
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const initialImages: GalleryImage[] = [
  // House of Legends
  {
    id: "hol-1",
    src: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Signature cocktail experience",
    category: "house-of-legends"
  },
  {
    id: "hol-2",
    src: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Bottled cocktails",
    category: "house-of-legends"
  },
  {
    id: "hol-3",
    src: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Bar setup",
    category: "house-of-legends"
  },
  
  // Legends of Cocktails
  {
    id: "loc-1",
    src: "https://images.unsplash.com/photo-1574096079513-d8259312b785?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Mobile bar setup",
    category: "legends-of-cocktails"
  },
  {
    id: "loc-2",
    src: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Cocktail workshop",
    category: "legends-of-cocktails"
  },
  {
    id: "loc-3",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Bartender service",
    category: "legends-of-cocktails"
  },
  
  // Namibian Bar Masters
  {
    id: "nbm-1",
    src: "https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Bartender training session",
    category: "namibian-bar-masters"
  },
  {
    id: "nbm-2",
    src: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Mixology class",
    category: "namibian-bar-masters"
  },
  {
    id: "nbm-3",
    src: "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Training graduates",
    category: "namibian-bar-masters"
  }
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up page title and meta description
    document.title = "Image Gallery | House of Legends";
    
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Browse our gallery of cocktail experiences, hospitality services, and bartending training by House of Legends brands.";
    document.head.appendChild(metaDesc);
    
    return () => {
      document.head.removeChild(metaDesc);
    };
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // In a real implementation, you would upload these files to a server
    // For now, we'll just create local URL objects and add them to the gallery
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Only image files are allowed",
          variant: "destructive"
        });
        return;
      }
      
      // Create a temporary URL for the file
      const imageUrl = URL.createObjectURL(file);
      const newImage: GalleryImage = {
        id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        src: imageUrl,
        alt: file.name.split('.')[0] || "Uploaded image",
        category: "house-of-legends" // Default category
      };
      
      setImages(prev => [...prev, newImage]);
    });
    
    setIsUploadDialogOpen(false);
    
    toast({
      title: "Images uploaded",
      description: "Your images have been added to the gallery",
    });
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    toast({
      title: "Image deleted",
      description: "The image has been removed from the gallery",
    });
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    toast({
      title: isAdminMode ? "Admin mode disabled" : "Admin mode enabled",
      description: isAdminMode 
        ? "You are now in viewing mode" 
        : "You can now add, edit, or delete gallery images",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Gallery</h1>
              <p className="text-neutral text-lg">Browse photos from our brands, events, and services</p>
            </div>
            
            <div className="flex space-x-4">
              {isAdminMode && (
                <Button 
                  variant="default" 
                  className="bg-secondary hover:bg-secondary/90 text-black"
                  onClick={() => setIsUploadDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Images
                </Button>
              )}
              
              <Button 
                variant={isAdminMode ? "default" : "outline"} 
                className={isAdminMode 
                  ? "bg-primary hover:bg-primary/90 text-white" 
                  : "border-primary text-primary hover:bg-primary hover:text-white"
                }
                onClick={toggleAdminMode}
              >
                <Edit2 className="mr-2 h-4 w-4" /> {isAdminMode ? "Exit Admin" : "Admin Mode"}
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="house-of-legends">House of Legends</TabsTrigger>
              <TabsTrigger value="legends-of-cocktails">Legends of Cocktails</TabsTrigger>
              <TabsTrigger value="namibian-bar-masters">Namibian Bar Masters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map(image => (
                  <div key={image.id} className="relative group">
                    <div className="overflow-hidden rounded-lg shadow-md bg-black aspect-[4/3]">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
                        onClick={() => handleImageClick(image)}
                      />
                    </div>
                    
                    {isAdminMode && (
                      <button 
                        className="absolute top-2 right-2 bg-destructive rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteImage(image.id)}
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {["house-of-legends", "legends-of-cocktails", "namibian-bar-masters"].map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {images
                    .filter(image => image.category === category)
                    .map(image => (
                      <div key={image.id} className="relative group">
                        <div className="overflow-hidden rounded-lg shadow-md bg-black aspect-[4/3]">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
                            onClick={() => handleImageClick(image)}
                          />
                        </div>
                        
                        {isAdminMode && (
                          <button 
                            className="absolute top-2 right-2 bg-destructive rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteImage(image.id)}
                          >
                            <X className="h-4 w-4 text-white" />
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Lightbox Dialog */}
      {selectedImage && (
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className="max-w-4xl bg-black border-0">
            <DialogTitle className="text-white">{selectedImage.alt}</DialogTitle>
            <div className="mt-4 flex justify-center">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-h-[70vh] object-contain" 
              />
            </div>
            <DialogClose className="absolute right-4 top-4 text-white hover:text-secondary">
              <X className="h-5 w-5" />
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Upload Images</DialogTitle>
          <DialogDescription>
            Add new images to the gallery. Drag and drop files or click to browse.
          </DialogDescription>
          
          <div 
            className={`mt-4 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer ${
              dragActive ? "border-secondary bg-secondary/10" : "border-border"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-1">
              Drag and drop image files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG, GIF, WEBP (max 5MB)
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              multiple 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}