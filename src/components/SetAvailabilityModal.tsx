
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SetAvailabilityModalProps {
  trigger: React.ReactNode;
}

const SetAvailabilityModal = ({ trigger }: SetAvailabilityModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "17:00" },
    saturday: { enabled: false, start: "10:00", end: "14:00" },
    sunday: { enabled: false, start: "10:00", end: "14:00" }
  });
  const [blackoutDates, setBlackoutDates] = useState<string[]>([]);
  const [newBlackoutDate, setNewBlackoutDate] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [autoAccept, setAutoAccept] = useState(false);
  const [maxDailyPickups, setMaxDailyPickups] = useState("5");
  const { toast } = useToast();

  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" }
  ];

  const handleDayToggle = (day: string, enabled: boolean) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], enabled }
    }));
  };

  const handleTimeChange = (day: string, timeType: "start" | "end", value: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [timeType]: value }
    }));
  };

  const addBlackoutDate = () => {
    if (newBlackoutDate && !blackoutDates.includes(newBlackoutDate)) {
      setBlackoutDates([...blackoutDates, newBlackoutDate]);
      setNewBlackoutDate("");
    }
  };

  const removeBlackoutDate = (date: string) => {
    setBlackoutDates(blackoutDates.filter(d => d !== date));
  };

  const handleSave = () => {
    // Simulate saving availability
    setTimeout(() => {
      toast({
        title: "Availability Updated",
        description: "Your pickup/delivery availability has been saved successfully.",
      });
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Set Your Availability</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPickups">Max Daily Pickups</Label>
                  <Input
                    id="maxPickups"
                    type="number"
                    value={maxDailyPickups}
                    onChange={(e) => setMaxDailyPickups(e.target.value)}
                    min="1"
                    max="20"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoAccept"
                  checked={autoAccept}
                  onCheckedChange={(checked) => setAutoAccept(checked as boolean)}
                />
                <Label htmlFor="autoAccept" className="text-sm cursor-pointer">
                  Auto-accept pickup requests during available hours
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {daysOfWeek.map((day) => {
                const daySchedule = weeklySchedule[day.key as keyof typeof weeklySchedule];
                return (
                  <div key={day.key} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-20">
                      <Checkbox
                        checked={daySchedule.enabled}
                        onCheckedChange={(checked) => handleDayToggle(day.key, checked as boolean)}
                      />
                      <Label className="ml-2 text-sm font-medium cursor-pointer">
                        {day.label}
                      </Label>
                    </div>
                    
                    {daySchedule.enabled && (
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <Label className="text-xs">From:</Label>
                          <Input
                            type="time"
                            value={daySchedule.start}
                            onChange={(e) => handleTimeChange(day.key, "start", e.target.value)}
                            className="w-24 h-8 text-sm"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label className="text-xs">To:</Label>
                          <Input
                            type="time"
                            value={daySchedule.end}
                            onChange={(e) => handleTimeChange(day.key, "end", e.target.value)}
                            className="w-24 h-8 text-sm"
                          />
                        </div>
                      </div>
                    )}
                    
                    {!daySchedule.enabled && (
                      <div className="flex-1">
                        <Badge variant="secondary" className="text-xs">
                          Unavailable
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Blackout Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Blackout Dates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="date"
                  value={newBlackoutDate}
                  onChange={(e) => setNewBlackoutDate(e.target.value)}
                  className="flex-1"
                  min={new Date().toISOString().split('T')[0]}
                />
                <Button 
                  type="button" 
                  onClick={addBlackoutDate}
                  disabled={!newBlackoutDate}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {blackoutDates.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Blocked Dates:</Label>
                  <div className="flex flex-wrap gap-2">
                    {blackoutDates.map((date) => (
                      <Badge key={date} variant="outline" className="text-xs">
                        {new Date(date).toLocaleDateString()}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => removeBlackoutDate(date)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Status Preview */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Available Today:</Label>
                  <div className="font-medium">
                    {weeklySchedule.monday.enabled ? 
                      `${weeklySchedule.monday.start} - ${weeklySchedule.monday.end}` : 
                      "Not Available"
                    }
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Daily Limit:</Label>
                  <div className="font-medium">{maxDailyPickups} pickups</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Auto-Accept:</Label>
                  <div className="font-medium">{autoAccept ? "Enabled" : "Disabled"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="btn-primary">
              <Clock className="h-4 w-4 mr-2" />
              Save Availability
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetAvailabilityModal;
