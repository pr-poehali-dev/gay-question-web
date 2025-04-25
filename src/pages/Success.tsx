
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Rocket, ChevronLeft } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Декоративные неоновые линии */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"></div>
      </div>
      
      <div className="max-w-md text-center bg-gray-900/60 border-2 border-blue-700 rounded-lg p-8 backdrop-blur-sm shadow-lg shadow-blue-500/20 z-10">
        <Rocket className="w-16 h-16 mx-auto text-blue-400 mb-4" />
        <h1 className="text-4xl font-bold text-white mb-6">Молодец!</h1>
        <p className="text-gray-300 mb-8">
          Ты успешно прокачал свой энергетик до максимума! Твои клики стали мощными как никогда.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-gray-800 hover:bg-gray-700 text-white border-2 border-blue-600 rounded-lg px-6 py-3 text-lg font-medium shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 flex items-center mx-auto gap-2"
        >
          <ChevronLeft className="h-5 w-5" />
          Вернуться в игру
        </Button>
      </div>
      
      {/* Декоративные частицы */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 3}px`,
            height: `${Math.random() * 10 + 3}px`,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
            animationDuration: `${Math.random() * 5 + 2}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default Success;
