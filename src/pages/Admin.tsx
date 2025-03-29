import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import AwardList from "@/components/AwardList";
import AwardForm from "@/components/AwardForm";
import { useNavigate } from "react-router-dom";
import StorageInfo from "@/components/StorageInfo";
import { Event, Award } from "@/types/content"; 
import { auth } from "@/firebase";  // Import Firebase auth
import { signOut, onAuthStateChanged } from "firebase/auth";

const Admin = () => {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isAwardFormOpen, setIsAwardFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { awards, addAward, updateAward, deleteAward } = useAwards();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/");
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!isLoggedIn) {
    return null; // Prevents flashing UI before redirect
  }
  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
  };
  
  const handleDeleteAward = (awardId: string) => {
    deleteAward(awardId);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <StorageInfo />

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>
          <TabsContent value="events">
            <div className="mb-4">
              <Button onClick={() => setIsEventFormOpen(true)}>Add New Event</Button>
            </div>
            <EventList
              events={events}
              onEdit={(event: Event) => {
                setEditingEvent(event);
                setIsEventFormOpen(true);
              }}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
          <TabsContent value="awards">
            <div className="mb-4">
              <Button onClick={() => setIsAwardFormOpen(true)}>Add New Award</Button>
            </div>
            <AwardList
              awards={awards}
              onEdit={(award: Award) => {
                setEditingAward(award);
                setIsAwardFormOpen(true);
              }}
              onDelete={handleDeleteAward}
            />
          </TabsContent>
        </Tabs>

        {isEventFormOpen && (
          <EventForm
            event={editingEvent}
            onSubmit={(eventData: Event) => {
              if (editingEvent) {
                updateEvent(editingEvent.id, eventData);
                setEditingEvent(null);
              } else {
                addEvent(eventData);
              }
              setIsEventFormOpen(false);
            }}
            onCancel={() => {
              setIsEventFormOpen(false);
              setEditingEvent(null);
            }}
          />
        )}

        {isAwardFormOpen && (
          <AwardForm
            award={editingAward}
            onSubmit={(awardData: Award) => {
              if (editingAward) {
                updateAward(editingAward.id, awardData);
                setEditingAward(null);
              } else {
                addAward(awardData);
              }
              setIsAwardFormOpen(false);
            }}
            onCancel={() => {
              setIsAwardFormOpen(false);
              setEditingAward(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
