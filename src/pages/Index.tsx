
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Save, Rocket, Zap, Battery, Coffee, Star } from "lucide-react";

// Типы бустов
interface Boost {
  id: number;
  name: string;
  description: string;
  cost: number;
  power: number;
  purchased: boolean;
  icon: React.ReactNode;
}

// Функция для сохранения бустов без циклических ссылок
const serializeBoosts = (boosts: Boost[]) => {
  return boosts.map(boost => ({
    id: boost.id,
    name: boost.name,
    description: boost.description,
    cost: boost.cost,
    power: boost.power,
    purchased: boost.purchased,
    // Иконки будут пересозданы при загрузке
  }));
};

// Инициализация бустов с иконками
const createInitialBoosts = (savedBoosts?: any[]) => {
  const defaultBoosts = [
    {
      id: 1,
      name: "Двойная сила",
      description: "Увеличивает мощность клика до 5 очков",
      cost: 100,
      power: 5,
      purchased: false,
      icon: <Zap className="h-5 w-5 text-yellow-400" />
    },
    {
      id: 2,
      name: "Турбо Энергия",
      description: "Увеличивает мощность клика до 15 очков",
      cost: 500,
      power: 15,
      purchased: false,
      icon: <Battery className="h-5 w-5 text-blue-400" />
    },
    {
      id: 3,
      name: "Космический заряд",
      description: "Увеличивает мощность клика до 50 очков",
      cost: 2000,
      power: 50,
      purchased: false,
      icon: <Rocket className="h-5 w-5 text-purple-400" />
    },
    {
      id: 4,
      name: "Суперспособность",
      description: "Увеличивает мощность клика до 150 очков",
      cost: 8000,
      power: 150,
      purchased: false,
      icon: <Star className="h-5 w-5 text-amber-400" />
    },
    {
      id: 5,
      name: "Ультра Драйв",
      description: "Увеличивает мощность клика до 500 очков",
      cost: 25000,
      power: 500,
      purchased: false,
      icon: <Coffee className="h-5 w-5 text-red-400" />
    },
  ];

  // Если есть сохраненные бусты, используем их свойства, но добавляем иконки
  if (savedBoosts) {
    return defaultBoosts.map((defaultBoost, index) => {
      if (index < savedBoosts.length) {
        const savedBoost = savedBoosts[index];
        return {
          ...defaultBoost,
          purchased: savedBoost.purchased || false,
        };
      }
      return defaultBoost;
    });
  }

  return defaultBoosts;
};

const Index = () => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("redbull-count");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [clickPower, setClickPower] = useState(() => {
    const saved = localStorage.getItem("redbull-power");
    return saved ? parseInt(saved, 10) : 1;
  });
  
  const [showDialog, setShowDialog] = useState(false);
  const [animations, setAnimations] = useState<{ id: number; value: number; x: number; y: number }[]>([]);
  const [animationId, setAnimationId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [boosts, setBoosts] = useState<Boost[]>(() => {
    const saved = localStorage.getItem("redbull-boosts");
    return createInitialBoosts(saved ? JSON.parse(saved) : null);
  });

  const [selectedBoost, setSelectedBoost] = useState<Boost | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; rotate: number; color: string }[]>([]);
  const [particleId, setParticleId] = useState(0);

  // Сохранение прогресса при изменении значений
  useEffect(() => {
    localStorage.setItem("redbull-count", count.toString());
    localStorage.setItem("redbull-power", clickPower.toString());
    // Сохраняем только необходимые свойства бустов без React элементов
    localStorage.setItem("redbull-boosts", JSON.stringify(serializeBoosts(boosts)));
  }, [count, clickPower, boosts]);

  // Создание случайных декоративных частиц
  useEffect(() => {
    const timer = setInterval(() => {
      if (particles.length < 20) {
        const newParticle = {
          id: particleId,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 3,
          rotate: Math.random() * 360,
          color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`
        };
        setParticles(prev => [...prev, newParticle]);
        setParticleId(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [particles.length, particleId]);

  // Удаление старых частиц
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles(prev => {
        if (prev.length > 10) {
          return prev.slice(1);
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSaveGame = () => {
    localStorage.setItem("redbull-count", count.toString());
    localStorage.setItem("redbull-power", clickPower.toString());
    localStorage.setItem("redbull-boosts", JSON.stringify(serializeBoosts(boosts)));
    
    // Показать уведомление о сохранении
    setErrorMessage("Игра сохранена!");
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

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

  const openBoostDialog = (boost: Boost) => {
    setSelectedBoost(boost);
    setShowDialog(true);
  };

  const handleBuyBoost = () => {
    if (!selectedBoost) return;
    
    if (count >= selectedBoost.cost) {
      setCount(prev => prev - selectedBoost.cost);
      setClickPower(selectedBoost.power);
      
      // Обновить статус буста на "куплено"
      setBoosts(prev => prev.map(boost => 
        boost.id === selectedBoost.id 
          ? { ...boost, purchased: true } 
          : boost
      ));
      
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

  // Находим следующий доступный буст
  const getNextAvailableBoost = () => {
    return boosts.find(boost => !boost.purchased);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Декоративные частицы */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotate}deg)`,
            transition: 'all 10s ease-in-out'
          }}
        />
      ))}
      
      {/* Декоративные неоновые линии */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"></div>
      </div>
      
      {/* Counter */}
      <div className="absolute top-6 right-6 bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2 font-mono text-white text-2xl backdrop-blur-sm shadow-lg shadow-blue-500/10 z-10">
        {formatCount(count)}
      </div>
      
      {/* Save button */}
      <Button
        onClick={handleSaveGame}
        className="absolute top-6 left-6 bg-gray-900/80 border border-gray-700 text-white hover:bg-gray-800 z-10 group"
      >
        <Save className="h-5 w-5 mr-1 group-hover:text-blue-400 transition-colors" />
        Сохранить
      </Button>
      
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
              animation: 'moveUp 1s forwards',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.7)'
            }}
          >
            +{anim.value}
          </div>
        ))}
        
        {/* Red Bull can button with glow effect */}
        <Button
          onClick={handleClick}
          className="bg-transparent hover:bg-transparent focus:outline-none transform transition hover:scale-105 active:scale-95 border-none p-0 relative"
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <img 
            src="https://cdn.poehali.dev/files/9f1a9201-eb58-4163-898c-6ded557b1023.jpg" 
            alt="Red Bull энергетик" 
            className="w-48 h-auto rounded-full border-2 border-blue-600 shadow-lg shadow-blue-500/50 relative z-10"
          />
        </Button>
      </div>
      
      {/* Buy button */}
      <Button
        onClick={() => {
          const nextBoost = getNextAvailableBoost();
          if (nextBoost) {
            openBoostDialog(nextBoost);
          }
        }}
        className="mt-8 bg-gray-900 hover:bg-gray-800 text-white border-2 border-blue-700 px-8 py-4 rounded-lg text-lg font-medium shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 flex items-center gap-2"
        disabled={!getNextAvailableBoost()}
      >
        <Zap className="h-5 w-5 text-yellow-400" />
        купить Нью дринк
      </Button>
      
      {/* Boost list */}
      <div className="w-full max-w-md mt-6 grid grid-cols-3 gap-3">
        {boosts.map((boost) => (
          <div 
            key={boost.id}
            className={cn(
              "text-center p-2 rounded-md border cursor-pointer transition-all flex flex-col items-center justify-center gap-1",
              boost.purchased
                ? "bg-gray-900/50 border-gray-700 text-gray-400"
                : "bg-gray-900/50 border-blue-700/50 text-white hover:bg-gray-800/70 hover:border-blue-600"
            )}
            onClick={() => !boost.purchased && openBoostDialog(boost)}
          >
            {boost.icon}
            <div className="text-xs">{boost.name}</div>
            {!boost.purchased && <div className="text-xs text-yellow-500">{boost.cost}</div>}
            {boost.purchased && <div className="text-xs text-green-500">Куплено</div>}
          </div>
        ))}
      </div>
      
      {/* Boost dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-900 border-2 border-blue-700 text-white max-w-md rounded-lg shadow-lg shadow-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
              {selectedBoost?.icon}
              {selectedBoost?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 flex flex-col items-center">
            <p className="mb-6 text-center">
              {selectedBoost?.description}
              <br />
              Стоимость: <span className="text-yellow-400 font-bold">{selectedBoost?.cost}</span> баллов
            </p>
            <Button
              onClick={handleBuyBoost}
              className={cn(
                "px-6 py-2 rounded-lg font-medium border-2",
                selectedBoost?.purchased 
                  ? "bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed" 
                  : "bg-gray-800 hover:bg-gray-700 text-white border-blue-600 hover:border-blue-500"
              )}
              disabled={selectedBoost?.purchased || false}
            >
              Купить
            </Button>
            
            {errorMessage && (
              <div className="mt-4 text-red-500 font-bold text-center animate-pulse">
                {errorMessage}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <style>
        {`
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
      `}
      </style>
    </div>
  );
};

export default Index;
