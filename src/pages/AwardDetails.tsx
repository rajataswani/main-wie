
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Award } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, AwardIcon, ArrowLeft } from "lucide-react";
// import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const AwardDetails = () => {
  const { id } = useParams();
  const [award, setAward] = useState<Award | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAward = async () => {
      if (!id) return;
      
      try {
        const awardRef = doc(db, "awards", id);
        const awardDoc = await getDoc(awardRef);
        
        if (awardDoc.exists()) {
          const awardData = awardDoc.data();
          setAward({
            id: awardDoc.id,
            title: awardData.title || "",
            date: awardData.date || "",
            description: awardData.description || "",
            imageUrl: awardData.imageUrl || ""
          });
        }
      } catch (error) {
        console.error("Error fetching award:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAward();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-purple-700">Loading award details...</p>
      </div>
    );
  }

  if (!award) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">Award Not Found</h1>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* <Navbar /> */}
      
      <div className="max-w-4xl mx-auto pt-8 px-4 pb-16">
        <Button variant="outline" className="mb-6" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
          <img 
            src={award.imageUrl} 
            alt={award.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">{award.title}</h1>
        
        <div className="flex items-center gap-2 text-purple-700 mb-6">
          <CalendarIcon className="h-5 w-5" />
          <span>Received: {award.date}</span>
        </div>
        
        <div className="mb-8">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AwardIcon className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                <h3 className="font-semibold text-lg text-purple-800">Recognition of Excellence</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="prose prose-purple max-w-none">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Award Description</h2>
          <div className="whitespace-pre-wrap">
            {award.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardDetails;
