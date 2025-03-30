import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Award } from "@/types/content";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Axios upload function
  const uploadToImgur = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          "Authorization": "Client-ID 7deff2057df58d3", // Your Imgur Client ID
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return response.data.data.link;
      } else {
        throw new Error("Imgur upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Image upload failed. Please try again.");
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadToImgur(imageFile);
      }

      onSubmit({
        title,
        date,
        description,
        imageUrl: finalImageUrl,
      });
    } catch (error) {
      console.error("Error submitting award:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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

          {errorMessage && (
            <div className="text-red-600 mt-2">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : award ? "Update" : "Add"} Award
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AwardForm;
