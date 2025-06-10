import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle, Star, Camera, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarkCompletedModalProps {
  trigger: React.ReactNode;
  foodItem: {
    id: number;
    title: string;
    donor: string;
    foodType: string;
    quantity: string;
  };
}

const MarkCompletedModal = ({ trigger, foodItem }: MarkCompletedModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [peopleFed, setPeopleFed] = useState("");
  const [actualQuantity, setActualQuantity] = useState("");
  const [shareStory, setShareStory] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const { toast } = useToast();

  const handleComplete = () => {
    // Simulate completion
    setTimeout(() => {
      toast({
        title: "Pickup Marked as Completed!",
        description: `Thank you for the feedback! Your impact: ${peopleFed} people fed with ${actualQuantity} of food.`,
      });
      setIsOpen(false);
    }, 1000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span>Mark Pickup as Completed</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pickup Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">{foodItem.title}</h3>
            <div className="text-sm text-muted-foreground">
              From: {foodItem.donor}
            </div>
            <Badge variant="secondary">Expected: {foodItem.quantity}</Badge>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="peopleFed">Number of People Fed</Label>
              <Input
                id="peopleFed"
                type="number"
                value={peopleFed}
                onChange={(e) => setPeopleFed(e.target.value)}
                placeholder="25"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actualQuantity">Actual Quantity Received</Label>
              <Input
                id="actualQuantity"
                value={actualQuantity}
                onChange={(e) => setActualQuantity(e.target.value)}
                placeholder="23kg (vs expected 25kg)"
                className="w-full"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label>Rate Your Experience with {foodItem.donor}</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating === 5 ? "Excellent" : rating === 4 ? "Good" : rating === 3 ? "Average" : rating === 2 ? "Poor" : "Very Poor"}
              </span>
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback & Comments</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="How was the pickup process? Was the food quality as expected? Any suggestions for improvement?"
              rows={4}
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Share Photos (Optional)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground mb-2">
                Upload photos of the food distribution or meals prepared
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">Choose Photos</span>
                </Button>
              </label>
            </div>
            {photos.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {photos.length} photo(s) selected
              </div>
            )}
          </div>

          {/* Share Story Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="shareStory"
              checked={shareStory}
              onCheckedChange={(checked) => setShareStory(checked as boolean)}
            />
            <Label htmlFor="shareStory" className="text-sm cursor-pointer">
              Share this success story on the community impact board (helps inspire more donations)
            </Label>
          </div>

          {/* Impact Preview */}
          {peopleFed && (
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                <Users className="h-5 w-5" />
                <span className="font-medium">
                  Impact: {peopleFed} people fed thanks to this donation!
                </span>
              </div>
              <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                This will be added to both your organization's and the donor's impact statistics.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleComplete} className="btn-primary">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Completed
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkCompletedModal;
