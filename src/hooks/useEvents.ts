
import { useState, useEffect } from "react";
import { type Event } from "@/types/content";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Convert Firestore document to Event type
  const convertDocToEvent = (doc: QueryDocumentSnapshot<DocumentData>): Event => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      location: data.location || "",
      imageUrl: data.imageUrl || "",
      ieeeCount: data.ieeeCount || 0,
      nonIeeeCount: data.nonIeeeCount || 0
    };
  };
  
  useEffect(() => {
    // Load events from Firestore
    const loadEvents = async () => {
      try {
        console.log("Loading events from Firestore...");
        const eventsCollection = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCollection);
        console.log("Events snapshot:", eventSnapshot.size);
        const eventsList = eventSnapshot.docs.map(convertDocToEvent);
        setEvents(eventsList);
        console.log("Events loaded:", eventsList);
      } catch (error) {
        console.error("Error loading events:", error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, []);
  
  const addEvent = async (event: Omit<Event, "id">) => {
    try {
      console.log("Adding event to Firestore:", event);
      const eventsCollection = collection(db, "events");
      const docRef = await addDoc(eventsCollection, event);
      console.log("Event added with ID:", docRef.id);
      
      const newEvent = {
        ...event,
        id: docRef.id,
      };
      
      setEvents([...events, newEvent]);
      
      toast({
        title: "Success",
        description: "Event added successfully!",
      });
      
      return newEvent;
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const updateEvent = async (id: string, updatedEvent: Partial<Event>) => {
    try {
      console.log("Updating event:", id, updatedEvent);
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, updatedEvent);
      
      const updatedEvents = events.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      );
      
      setEvents(updatedEvents);
      
      toast({
        title: "Success",
        description: "Event updated successfully!",
      });
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const deleteEvent = async (id: string) => {
    try {
      console.log("Deleting event:", id);
      const eventRef = doc(db, "events", id);
      await deleteDoc(eventRef);
      
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      
      toast({
        title: "Success",
        description: "Event deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  return { events, loading, addEvent, updateEvent, deleteEvent };
}
