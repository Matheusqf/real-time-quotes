import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Button } from '../Button/styles';

function InactivityAlert() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const handleClick = () => { signout(); setIsSessionExpired(false); navigate('/') };

  useEffect(() => {
    let timeoutId;

    function resetTimeout() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsSessionExpired(true);
      }, 60 * 1000);
    }

    resetTimeout();
    document.addEventListener('mousemove', resetTimeout);
    document.addEventListener('keypress', resetTimeout);
    document.addEventListener('touchstart', resetTimeout);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', resetTimeout);
      document.removeEventListener('keypress', resetTimeout);
      document.removeEventListener('touchstart', resetTimeout);
    };
  }, []);

  if (isSessionExpired) {
    return (
      <div className="overlay">
        <div className="overlay-content">
          <p>Sua sessão expirou devido à inatividade. Por favor, faça login novamente.</p>
          <Button className="button" onClick={handleClick}>OK</Button>
        </div>
      </div>
    )
  }

  return null;
}

export default InactivityAlert;
