import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollTop=()=>{
    const {pathname}=useLocation();
    useEffect(() => {
        // to directly touch the scrollable container in page
        const scrollContainer = document.querySelector('.scrollable-container'); 
        if (scrollContainer) {
          scrollContainer.scrollTo(0, 0);
        } else {
          window.scrollTo(0, 0);
        }
      }, [pathname]);
    return null;
}