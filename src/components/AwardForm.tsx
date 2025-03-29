
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Award } from "@/types/content";

interface AwardFormProps {
  award?: Omit<Award, "id">;
  onSubmit: (data: Omit<Award, "id">) => void;
  onCancel: () => void;
}

const AwardForm = ({ award, onSubmit, onCancel }: AwardFormProps) => {
  const [title, setTitle] = useState(award?.title || "");
  const [date, setDate] = useState(award?.date || "");
  const [description, setDescription] = useState(award?.description || "");
  const [imageUrl, setImageUrl] = useState(award?.imageUrl || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If an image file was selected, create a data URL
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        onSubmit({
          title,
          date,
          description,
          imageUrl: imageDataUrl,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      // Use the existing image URL or placeholder
      onSubmit({
        title,
        date,
        description,
        imageUrl: imageUrl || "/placeholder.svg",
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{award ? "Edit Award" : "Add New Award"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Award Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date Received</Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., March 2024"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Award Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>
          
          {imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="max-h-40 rounded-md object-cover" 
              />
            </div>
          )}
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">{award ? "Update" : "Add"} Award</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AwardForm;
