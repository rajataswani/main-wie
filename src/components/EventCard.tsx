
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Event } from "@/types/content";
import { CalendarIcon } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-purple-800">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          <span>{event.date}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">{event.location}</p>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
