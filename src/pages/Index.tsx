
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const requestPhoneNumber = async () => {
    try {
      // Проверяем поддержку API navigator.contacts
      if ('contacts' in navigator && 'select' in navigator.contacts) {
        const contacts = await navigator.contacts.select(
          ['tel'],
          { multiple: false }
        );
        
        if (contacts.length > 0 && contacts[0].tel && contacts[0].tel.length > 0) {
          setPhoneNumber(contacts[0].tel[0]);
        } else {
          throw new Error("Номер телефона не получен");
        }
      } 
      // Запрашиваем ввод номера вручную, если API не поддерживается
      else {
        const userNumber = prompt("Введите ваш номер телефона:");
        if (userNumber) {
          setPhoneNumber(userNumber);
        } else {
          throw new Error("Номер телефона не введен");
        }
      }
    } catch (error) {
      console.error("Ошибка при получении номера:", error);
      toast({
        variant: "destructive",
        title: "Не удалось получить номер телефона",
        description: "Пожалуйста, введите номер вручную."
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full flex flex-col items-center space-y-8">
        <h1 className="text-3xl font-bold text-center mb-6">Узнай свой номер телефона</h1>
        
        {!phoneNumber ? (
          <Button 
            onClick={requestPhoneNumber}
            className="bg-white text-black hover:bg-gray-200 font-bold text-xl px-12 py-8 rounded-full flex items-center gap-2 transition-transform hover:scale-105"
            size="lg"
          >
            <PhoneIcon className="w-6 h-6" />
            Показать мой номер
          </Button>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white text-black p-6 rounded-xl">
              <p className="text-xl font-medium">Ваш номер:</p>
              <p className="text-2xl font-bold mt-2">{phoneNumber}</p>
            </div>
            
            <Button
              variant="outline" 
              onClick={() => setPhoneNumber(null)}
              className="border-white text-white hover:bg-white/10"
            >
              Попробовать снова
            </Button>
          </div>
        )}
        
        <p className="text-sm text-gray-400 text-center mt-8 max-w-xs">
          Мы не сохраняем ваш номер телефона. Вся информация обрабатывается только на вашем устройстве.
        </p>
      </div>
    </div>
  );
};

export default Index;
