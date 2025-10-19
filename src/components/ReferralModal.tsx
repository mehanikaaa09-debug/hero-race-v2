  import React from 'react';

    interface ReferralModalProps {
      isOpen: boolean;
      onClose: () => void;
      points: number; // points оставлен, так как используется для отображения
      // setPoints: React.Dispatch<React.SetStateAction<number>>; // Эта строка УДАЛЕНА из интерфейса
      
      invitedFriendsCount?: number;
      totalReferralBonus?: number;
      referralLink?: string;
    }

    const ReferralModal: React.FC<ReferralModalProps> = ({ 
      isOpen, 
      onClose, 
    
      // setPoints, // setPoints УДАЛЕН из списка пропсов
      invitedFriendsCount = 0, 
      totalReferralBonus = 0,
      referralLink = 'https://t.me/herorace_bot?start=VSF5' 
    }) => {
      if (!isOpen) return null;

      const handleCopyLink = () => {
        if (referralLink) {
          navigator.clipboard.writeText(referralLink)
            .then(() => alert('Ссылка скопирована!'))
            .catch(err => console.error('Не удалось скопировать ссылку:', err));
        }
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg text-white w-80 max-w-sm">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Пригласи друзей!</h2> 
              <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-2xl leading-none">
                &times;
              </button>
            </div>

            <p className="text-white text-sm mb-4">Получай бонусы за каждого друга</p>

            <div className="bg-gray-800 p-3 rounded-lg flex justify-around items-center mb-4">
              <div>
                <p className="text-gray-300 text-sm">Приглашено друзей</p>
                <p className="text-xl font-bold text-white">{invitedFriendsCount}</p>
              </div>
              <div className="h-10 w-px bg-gray-600"></div>
              <div>
                <p className="text-gray-300 text-sm">Получено монет</p>
                <p className="text-xl font-bold text-yellow-500">+{totalReferralBonus}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-2">Твоя реферальная ссылка.</p>
              <div className="flex">
                <input 
                  type="text" 
                  readOnly 
                  value={referralLink} 
                  className="flex-grow p-2 border border-gray-700 rounded-l-md bg-gray-900 text-white text-sm"
                />
                <button 
                  onClick={handleCopyLink} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 text-sm"
                >
                  Копировать
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-gray-300 font-semibold mb-2">Как это работает?</h3>
              <ul className="list-none p-0 m-0 text-sm space-y-2">
                <li className="flex items-center">
                  <span className="bg-yellow
-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2">1</span>
                  <span className="text-gray-300">Поделись своей реферальной ссылкой с друзьями</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-yellow-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2">2</span>
                  <span className="text-gray-300">Твой друг переходит по ссылке и начинает играть</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-yellow-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2">3</span>
                  <span className="text-gray-300">Вы оба получаете по 5,000 Hero Coins!</span>
                </li>
              </ul>
            </div>

            <button className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 font-bold">
              Пригласить друзей
            </button>

          </div>
        </div>
      );
    };

    export default ReferralModal;