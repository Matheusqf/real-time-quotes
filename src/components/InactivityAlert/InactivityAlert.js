import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Button } from '../Button/styles';

function InactivityAlert() {
  const { signout, isSessionExpired, setIsSessionExpired } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => { signout(); setIsSessionExpired(false); navigate('/') };

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
