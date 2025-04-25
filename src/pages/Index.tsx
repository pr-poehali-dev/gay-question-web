
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Index = () => {
  const [count, setCount] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [animations, setAnimations] = useState<{ id: number; value: number; x: number; y: number }[]>([]);
  const [animationId, setAnimationId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [boostPurchased, setBoostPurchased] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Add new animation
    const newAnimation = {
      id: animationId,
      value: clickPower,
      x: clickX,
      y: clickY
    };
    
    setAnimations(prev => [...prev, newAnimation]);
    setAnimationId(prev => prev + 1);
    setCount(prev => prev + clickPower);
    
    // Remove animation after it completes
    setTimeout(() => {
      setAnimations(prev => prev.filter(a => a.id !== newAnimation.id));
    }, 1000);
  };

  const handleBuyBoost = () => {
    if (count >= 100) {
      setCount(prev => prev - 100);
      setClickPower(5);
      setBoostPurchased(true);
      setShowDialog(false);
    } else {
      setErrorMessage("не хватает средств плохо бухал");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const formatCount = (num: number) => {
    return num.toString().padStart(6, '0');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Counter */}
      <div className="absolute top-6 right-6 bg-black/40 border border-gray-700 rounded-lg px-4 py-2 font-mono text-white text-2xl">
        {formatCount(count)}
      </div>
      
      {/* Main clicker area */}
      <div className="flex-1 flex items-center justify-center relative w-full">
        {/* Click animations */}
        {animations.map(anim => (
          <div 
            key={anim.id}
            className="absolute text-white font-bold text-2xl animate-fade-up z-10"
            style={{
              left: `${anim.x}px`,
              top: `${anim.y}px`,
              transform: 'translate(-50%, -50%)',
              animation: 'moveUp 1s forwards'
            }}
          >
            +{anim.value}
          </div>
        ))}
        
        {/* Red Bull can button */}
        <Button
          onClick={handleClick}
          className="bg-transparent hover:bg-transparent focus:outline-none transform transition hover:scale-105 active:scale-95 border-none p-0"
        >
          <img 
            src="https://cdn.poehali.dev/files/71a21e9f-cbbd-42dd-940f-0c6f8a28b15f.jpg" 
            alt="Red Bull энергетик" 
            className="w-48 h-auto rounded-full border-2 border-gray-700"
          />
        </Button>
      </div>
      
      {/* Buy button */}
      <Button
        onClick={() => setShowDialog(true)}
        className="mt-8 bg-gray-900 hover:bg-gray-800 text-white border-2 border-gray-700 px-6 py-3 rounded-lg text-lg font-medium"
      >
        купить Нью дринк
      </Button>
      
      {/* Boost dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-900 border-2 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Буст +5 за клик</DialogTitle>
          </DialogHeader>
          <div className="p-4 flex flex-col items-center">
            <p className="mb-6 text-center">
              Увеличивает мощность клика до 5 очков за каждое нажатие.
              <br />
              Стоимость: 100 баллов
            </p>
            <Button
              onClick={handleBuyBoost}
              className={cn(
                "px-6 py-2 rounded-lg font-medium",
                boostPurchased 
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                  : "bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-600"
              )}
              disabled={boostPurchased}
            >
              {boostPurchased ? "Куплено" : "Купить"}
            </Button>
            
            {errorMessage && (
              <div className="mt-4 text-red-500 font-bold text-center animate-pulse">
                {errorMessage}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes moveUp {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -150%);
          }
        }
        
        .animate-fade-up {
          animation: moveUp 1s forwards;
        }
      `}</style>
    </div>
  );
};

export default Index;
