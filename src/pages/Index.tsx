
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [noButtonText, setNoButtonText] = useState("нет");
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("/success");
  };

  const handleNoClick = () => {
    setNoButtonText("да");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="mb-16 flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full mb-2 relative">
          <div className="absolute top-0 left-0 w-full h-full flex justify-between px-2 pt-1">
            <div className="w-3 h-3 bg-black rounded-full transform rotate-45"></div>
            <div className="w-3 h-3 bg-black rounded-full transform rotate-45"></div>
          </div>
        </div>
        <div className="w-24 h-24 border-2 border-white rounded-full -mt-12 pt-14"></div>
      </div>
      
      <h1 className="text-5xl font-bold mb-16">ты гей?</h1>
      
      <div className="flex gap-6">
        <Button 
          onClick={handleYesClick}
          className="bg-white text-black hover:bg-gray-200 font-bold text-xl px-8 py-6 rounded-full"
        >
          да
        </Button>
        
        <Button 
          onClick={noButtonText === "нет" ? handleNoClick : handleYesClick}
          className="bg-white text-black hover:bg-gray-200 font-bold text-xl px-8 py-6 rounded-full"
        >
          {noButtonText}
        </Button>
      </div>
    </div>
  );
};

export default Index;
