import React from 'react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose, points, setPoints }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-black">
        <h2 className="text-xl font-bold mb-4">Referral Modal</h2>
        <p>Your current points: {points}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ReferralModal;
