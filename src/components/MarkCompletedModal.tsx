import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle, Star, Camera, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Pickup {
  id: string;
  title: string;
  donor: string;
  time: string;
  address: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  contact: string;
  notes: string;
  foodType: string;
  quantity: string;
  expiryDate: string;
}

interface MarkCompletedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  foodItem: Pickup;
}

export function MarkCompletedModal({
  open,
  onOpenChange,
  foodItem,
}: MarkCompletedModalProps) {
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [peopleFed, setPeopleFed] = useState("");
  const [actualQuantity, setActualQuantity] = useState("");
  const [shareStory, setShareStory] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the completion status to your backend
    console.log({
      pickupId: foodItem.id,
      status: "completed",
      notes,
    });
    onOpenChange(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* Trigger component content */}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span>Mark Pickup as Completed</span>
          </DialogTitle>
          <DialogDescription>
            Confirm that you have completed the pickup for {foodItem.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Completion Notes</label>
            <Textarea
              placeholder="Add any notes about the pickup completion..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
