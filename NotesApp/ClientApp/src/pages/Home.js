import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import LoadingAnimation from '../components/LoadAnimation';

export default function Home() {
  const router = useNavigate();

  useEffect(() => {
    router('/explorer');
  }, [router]);
  return (
      <div className="flex justify-center items-center">
        <LoadingAnimation/>
      </div>
  );
}
