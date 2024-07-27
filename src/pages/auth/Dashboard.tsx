import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signup');
  }, []);

  return (
    <>
    </>);
}