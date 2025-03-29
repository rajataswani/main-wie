
import { type Event } from "@/types/content";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList = ({ events, onEdit, onDelete }: EventListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No events added yet. Add your first event using the button above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div 
          key={event.id} 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="w-20 h-20 flex-shrink-0">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover rounded-md" 
            />
          </div>
          
          <div className="flex-grow">
            <h3 className="font-medium text-purple-800">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.date}</p>
            <p className="text-sm text-gray-600 line-clamp-1">{event.description}</p>
          </div>
          
          <div className="flex gap-2 self-end sm:self-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(event)}
              className="flex items-center gap-1"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(event.id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
