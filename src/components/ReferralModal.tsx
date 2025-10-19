import { useState, useEffect } from 'react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  setPoints: (points: number) => void;
}

interface Friend {
  id: string;
  name: string;
  points: number;
}

const ReferralModal = ({ isOpen, onClose, points, setPoints }: ReferralModalProps) => {
  const [referralCode, setReferralCode] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem('referralCode');
    if (savedCode) {
      setReferralCode(savedCode);
    } else {
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setReferralCode(newCode);
      localStorage.setItem('referralCode', newCode);
    }
  }, []);

  // Reload friends whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const savedFriends = localStorage.getItem('friends');
      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      }
    }
  }, [isOpen]);

  const referralLink = `https://t.me/herorace_bot?start=${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const totalReward = friends.length * 5000;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-3xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">Пригласи друзей!</h2>
        <p className="text-gray-400 mb-6">Получай бонусы за каждого друга</p>

        <div className="bg-[#2a2a2a] rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Приглашено друзей</p>
              <p className="text-3xl font-bold text-white">{friends.length}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Получено монет</p>
              <p className="text-3xl font-bold text-yellow-400">+{totalReward.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-white mb-2 font-medium">Твоя реферальная ссылка:</p>
          <div className="bg-[#2a2a2a] rounded-xl p-3 flex items-center justify-between">
            <p className="text-gray-300 text-sm truncate flex-1">{referralLink}</p>
            <button
              onClick={copyToClipboard}
              className="ml-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              {copied ? '✓' : 'Копировать'}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-3">Как это работает?</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold mr-3 flex-shrink-0">1</div>
              <p className="text-gray-300">Поделись своей реферальной ссылкой с друзьями</p>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold mr-3 flex-shrink-0">2</div>
              <p className="text-gray-300">Твой друг переходит по ссылке и начинает играть</p>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold mr-3 flex-shrink-0">3</div>
              <p className="text-gray-300">Вы оба получаете по <span className="text-yellow-400 font-bold">5,000 Hero Coins</span>!</p>
            </div>
          </div>
        </div>

        {friends.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Твои друзья ({friends.length})</h3>
            <div className="space-y-2">
              {friends.map((friend) => (
                <div key={friend.id} className="bg-[#2a2a2a] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-3">
                      {friend.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{friend.name}</p>
                      <p className="text-gray-400 text-sm">{friend.points.toLocaleString()} монет</p>
                    </div>
                  </div>
                  <p className="text-green-400 font-medium">+5,000</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={copyToClipboard}
          className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg mt-6 hover:bg-yellow-400 transition-colors"
        >
          {copied ? 'Ссылка скопирована!' : 'Пригласить друзей'}
        </button>
      </div>
    </div>
  );
};

export default ReferralModal;
