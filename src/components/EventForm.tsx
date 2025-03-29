
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Event } from "@/types/content";

interface EventFormProps {
  event?: Omit<Event, "id">;
  onSubmit: (data: Omit<Event, "id">) => void;
  onCancel: () => void;
}

const EventForm = ({ event, onSubmit, onCancel }: EventFormProps) => {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");
  const [description, setDescription] = useState(event?.description || "");
  const [location, setLocation] = useState(event?.location || "");
  const [imageUrl, setImageUrl] = useState(event?.imageUrl || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [ieeeCount, setIeeeCount] = useState(event?.ieeeCount || 0);
  const [nonIeeeCount, setNonIeeeCount] = useState(event?.nonIeeeCount || 0);
  
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
          location,
          imageUrl: imageDataUrl,
          ieeeCount,
          nonIeeeCount
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      // Use the existing image URL or placeholder
      onSubmit({
        title,
        date,
        description,
        location,
        imageUrl: imageUrl || "/placeholder.svg",
        ieeeCount,
        nonIeeeCount
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
          <DialogTitle>{event ? "Edit Event" : "Add New Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., March 15, 2024"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Silver Oak University, Ahmedabad"
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
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ieeeCount">IEEE Members Count</Label>
              <Input
                id="ieeeCount"
                type="number"
                min="0"
                value={ieeeCount}
                onChange={(e) => setIeeeCount(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nonIeeeCount">Non-IEEE Members Count</Label>
              <Input
                id="nonIeeeCount"
                type="number"
                min="0"
                value={nonIeeeCount}
                onChange={(e) => setNonIeeeCount(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Event Image</Label>
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
            <Button type="submit">{event ? "Update" : "Add"} Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
