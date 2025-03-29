
import { useState, useEffect } from "react";
import { type Award } from "@/types/content";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Convert Firestore document to Award type
  const convertDocToAward = (doc: QueryDocumentSnapshot<DocumentData>): Award => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      imageUrl: data.imageUrl || ""
    };
  };
  
  useEffect(() => {
    // Load awards from Firestore
    const loadAwards = async () => {
      try {
        console.log("Loading awards from Firestore...");
        const awardsCollection = collection(db, "awards");
        const awardSnapshot = await getDocs(awardsCollection);
        console.log("Awards snapshot:", awardSnapshot.size);
        const awardsList = awardSnapshot.docs.map(convertDocToAward);
        setAwards(awardsList);
        console.log("Awards loaded:", awardsList);
      } catch (error) {
        console.error("Error loading awards:", error);
        toast({
          title: "Error",
          description: "Failed to load awards. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadAwards();
  }, []);
  
  const addAward = async (award: Omit<Award, "id">) => {
    try {
      console.log("Adding award to Firestore:", award);
      const awardsCollection = collection(db, "awards");
      const docRef = await addDoc(awardsCollection, award);
      console.log("Award added with ID:", docRef.id);
      
      const newAward = {
        ...award,
        id: docRef.id,
      };
      
      setAwards([...awards, newAward]);
      
      toast({
        title: "Success",
        description: "Award added successfully!",
      });
      
      return newAward;
    } catch (error) {
      console.error("Error adding award:", error);
      toast({
        title: "Error",
        description: "Failed to add award. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const updateAward = async (id: string, updatedAward: Partial<Award>) => {
    try {
      console.log("Updating award:", id, updatedAward);
      const awardRef = doc(db, "awards", id);
      await updateDoc(awardRef, updatedAward);
      
      const updatedAwards = awards.map(award => 
        award.id === id ? { ...award, ...updatedAward } : award
      );
      
      setAwards(updatedAwards);
      
      toast({
        title: "Success",
        description: "Award updated successfully!",
      });
    } catch (error) {
      console.error("Error updating award:", error);
      toast({
        title: "Error",
        description: "Failed to update award. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const deleteAward = async (id: string) => {
    try {
      console.log("Deleting award:", id);
      const awardRef = doc(db, "awards", id);
      await deleteDoc(awardRef);
      
      const updatedAwards = awards.filter(award => award.id !== id);
      setAwards(updatedAwards);
      
      toast({
        title: "Success",
        description: "Award deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting award:", error);
      toast({
        title: "Error",
        description: "Failed to delete award. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  return { awards, loading, addAward, updateAward, deleteAward };
}
