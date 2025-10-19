import { useEffect, useState } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import ReferralModal from './components/ReferralModal';

// --- ИМПОРТЫ ИЗОБРАЖЕНИЙ ---
// ВАЖНО: УБЕДИТЕСЬ, что имена файлов в папке 'src/images' ТОЧНО совпадают
// с путями здесь, включая пробелы и скобки, если они есть.
// Крайне рекомендуется переименовать файлы, убрав пробелы и скобки (например, rocket (2).png -> rocket.png),
// и затем обновить пути здесь.
import heroCoinImage from './images/hero-coin.png';
import highVoltageImage from './images/high-voltage (2).png'; // Убедитесь, что имя файла ТОЧНО такое!
import rocketImage from './images/rocket (2).png';           // Убедитесь, что имя файла ТОЧНО такое!
import trophyImage from './images/trophy.png';
// Если у вас нет 'bear.png', закомментируйте следующую строку.
import bearImage from './images/bear.png'; // Предполагаем, что bear.png существует
const coinImage = heroCoinImage; // Если 'coin' = 'heroCoin'

const App = () => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('points');
    return saved ? parseInt(saved) : 29857775;
  });
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const pointsToAdd = 12;
  const energyToReduce = 12;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Save points to localStorage
  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('start');
    
    if (refCode) {
      const usedCodes = JSON.parse(localStorage.getItem('usedReferralCodes') || '[]');
      
      if (!usedCodes.includes(refCode)) {
        const friends = JSON.parse(localStorage.getItem('friends')
|| '[]');
        const newFriend = {
          id: Date.now().toString(),
          name: `Друг ${friends.length + 1}`, // <-- ИСПРАВЛЕНО: обратные кавычки
          points: 5000
        };
        
        friends.push(newFriend);
        usedCodes.push(refCode);
        
        localStorage.setItem('friends', JSON.stringify(friends));
        localStorage.setItem('usedReferralCodes', JSON.stringify(usedCodes));
        
        // Bonus for using referral
        setPoints(prev => prev + 5000);
      }
    }
  }, []);

  return (
    <div className="min-h-screen px-4 flex flex-col items-center text-white font-medium relative" style={{ 
      backgroundImage: 'url(/background.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: '50% 35%',
      backgroundRepeat: 'no-repeat'
    }}>

      <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">

        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block" /></p>
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            {/* Изображение trophy было здесь. Если оно вам нужно, раскомментируйте и убедитесь, что trophyImage импортирован */}
            {/* <img src={trophyImage} width={24} height={24} alt="Trophy icon" className="mr-2" /> */}
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
          </div>
        </div>


        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltageImage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 6500</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
                <button onClick={() => setIsReferralModalOpen(true)} className="flex flex-col items-center gap-1">
                  <img src={bearImage} width={24} height={24} alt="Bear" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={coinImage} width={24} height={24} alt="Coin" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={rocketImage} width={24} height={24} alt="Rocket" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / 6500) * 100}%` }}></div>
          </div>
        </div>


        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <img src={heroCoinImage} width={256} height={256} alt="hero coin" className="rounded-fu
ll" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: 'float 1s ease-out'
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                12
              </div>
            ))}
          </div>
        </div>

      </div>

      <ReferralModal 
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        points={points}
        setPoints={setPoints}
      />
    </div>
  );
};

export default App;

