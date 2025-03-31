import React, { useEffect, useState } from 'react';

interface CookieConsentProps {
  message?: string;
  acceptText?: string;
  denyText?: string;
  position?: 'top' | 'bottom';
  onAccept?: () => void;
  onDeny?: () => void;
  checkConsentNeeded?: () => boolean; // Optional logic to decide if banner is needed
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  message = 'This site may use cookies or similar technologies to enhance your experience.',
  acceptText = 'Accept',
  denyText = 'Deny',
  position = 'bottom',
  onAccept,
  onDeny,
  checkConsentNeeded = () => true, // By default, assume consent is needed
}) => {
  const [visible, setVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (!storedConsent && checkConsentNeeded()) {
      setVisible(true);
    }
    setConsentGiven(storedConsent === 'true');
  }, [checkConsentNeeded]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
    setConsentGiven(true);
    onAccept?.();
  };

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'false');
    setVisible(false);
    setConsentGiven(false);
    onDeny?.();
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        width: '100%',
        background: '#111',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        fontSize: '0.9rem',
      }}
    >
      <span>{message}</span>
      <div>
        <button onClick={handleAccept} style={{ marginRight: '0.5rem' }}>
          {acceptText}
        </button>
        <button onClick={handleDeny}>{denyText}</button>
      </div>
    </div>
  );
};

export default CookieConsent;

export const useCookieConsent = () => {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const value = localStorage.getItem('cookieConsent');
    setConsentGiven(value === 'true');
  }, []);

  const giveConsent = () => {
    localStorage.setItem('cookieConsent', 'true');
    setConsentGiven(true);
  };

  const denyConsent = () => {
    localStorage.setItem('cookieConsent', 'false');
    setConsentGiven(false);
  };

  return { consentGiven, giveConsent, denyConsent };
};
