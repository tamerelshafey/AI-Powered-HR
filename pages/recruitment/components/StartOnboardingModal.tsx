import React from 'react';
import { Candidate } from '../../../types';
import ConfirmationModal from '../../../components/ConfirmationModal';

interface StartOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidate: Candidate | null;
}

const StartOnboardingModal: React.FC<StartOnboardingModalProps> = ({ isOpen, onClose, onConfirm, candidate }) => {
  if (!isOpen || !candidate) return null;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="بدء عملية التعيين؟"
      message={`تم نقل ${candidate.name} إلى مرحلة التعيين. هل ترغب في بدء عملية التعيين الرسمية له الآن؟`}
      confirmText="نعم، ابدأ العملية"
      confirmColor="blue"
    />
  );
};

export default StartOnboardingModal;