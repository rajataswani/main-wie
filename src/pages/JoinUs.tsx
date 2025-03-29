
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction, Mail } from "lucide-react";
import { useEffect } from "react";

const JoinUs = () => {
  useEffect(() => {
    // Redirect to the IEEE contact page
    window.location.href = "https://ieee.socet.edu.in/contact/";
  }, []);

  // This will only render briefly before redirect
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Construction className="h-24 w-24 text-purple-800 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Redirecting you...</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          Taking you to the IEEE SOU contact page. If you're not redirected automatically, please click the button below.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-purple-700 hover:bg-purple-800" asChild>
            <a href="https://ieee.socet.edu.in/contact/" target="_blank" rel="noopener noreferrer">
              <Mail className="h-4 w-4 mr-2" />
              Go to Contact Page
            </a>
          </Button>
          
          <Button variant="outline" className="border-purple-300" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
