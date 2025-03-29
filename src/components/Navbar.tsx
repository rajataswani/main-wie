import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const navItems = [
    { label: "Home", href: "/", isExternal: false, isScroll: false },
    { label: "About", href: "#about", isExternal: false, isScroll: true },
    { label: "Events & Awards", href: "#activities", isExternal: false, isScroll: true },
    { label: "IEEE WIE", href: "https://wie.ieee.org/", isExternal: true, isScroll: false },
    { label: "Learn More", href: "/learn-more", isExternal: false, isScroll: false },
    { label: "Join Us", href: "https://ieee.socet.edu.in/contact/", isExternal: true, isScroll: false },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleScrollClick = (event, href) => {
    event.preventDefault();
    setIsOpen(false);
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  const renderNavItem = (item, index) => (
    <li key={index}>
      {item.isExternal ? (
        <a 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`flex items-center gap-1 hover:text-purple-600 ${item.label === "IEEE WIE" ? "flex items-center gap-1" : ""}`}
          onClick={() => setIsOpen(false)}
        >
          {item.label} {item.label === "IEEE WIE" && <ExternalLink className="h-3 w-3" />}
        </a>
      ) : item.isScroll ? (
        <a 
          href={item.href} 
          className="hover:text-purple-600"
          onClick={(e) => handleScrollClick(e, item.href)}
        >
          {item.label}
        </a>
      ) : (
        <Link 
          to={item.href} 
          className="hover:text-purple-600"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
  
  // Calculate the navbar's position based on different conditions for mobile and desktop
  const navbarPosition = isMobile 
    ? (scrollPosition > 50 ? 0 : 96) // Increased top position for mobile to avoid overlap (138 is random value, but fits perfectly)
    : (scrollPosition > 50 ? 0 : 40); // Desktop: Stick to top when scrolled
  
  return (
    <nav 
      className={`fixed left-0 right-0 z-50 w-full ${isMobile ? 'max-w-3xl mx-auto bg-white/90 backdrop-blur-sm shadow-sm rounded-full' : 'bg-purple-800 text-white'} my-6 py-3 px-4`}
      style={{ 
        top: `${navbarPosition}px`,
        transition: 'top 0.3s ease-in-out'
      }}
    >
      {isMobile ? (
        <div className="flex items-center justify-between">
          <Link to="/" className="text-purple-800 font-semibold">IEEE WIE SOU</Link>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-purple-800">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-purple-800">Menu</h2>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <ul className="flex flex-col space-y-4 px-6 text-purple-800 font-medium">
                    {navItems.map(renderNavItem)}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="http://ieee.socet.edu.in/wp-content/uploads/2025/03/WIE-LOGO-2.png" 
              alt="IEEE WIE Logo" 
              className="h-20"
            />
          </Link>
          <ul className="flex items-center gap-x-6 text-sm font-medium text-white">
            {navItems.map(renderNavItem)}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
