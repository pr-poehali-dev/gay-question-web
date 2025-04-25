
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

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
      
      <h1 className="text-5xl font-bold mb-16">молодец</h1>
      
      <Button 
        onClick={() => navigate("/")}
        className="bg-white text-black hover:bg-gray-200 font-bold text-xl px-8 py-6 rounded-full"
      >
        назад
      </Button>
    </div>
  );
};

export default Success;
