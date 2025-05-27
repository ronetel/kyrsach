import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { CircleUser, User, Coins } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Api } from '@/shered/services/api-client';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await Api.auth.getMe();
        setPoints(userData.Points || 0);
      } catch (error) {
        console.error('Failed to fetch user points:', error);
        setPoints(0);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPoints();
  }, [session]);

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {!loading && (
        <div className="flex items-center gap-1 px-2 py-1">
          <Coins size={20} className="text-yellow-300" />
          <span className="text-md font-medium">{points}</span>
        </div>
      )}
      {!session ? (
        <Button 
          onClick={onClickSignIn} 
          className="flex items-center gap-1 h-9"
        >
          <User size={16} />
          <span>Войти</span>
        </Button>
      ) : (
        <Link href="/profile">
          <Button 
            variant="secondary" 
            className="flex items-center gap-1 h-9"
          >
            <CircleUser size={16} className='text-main'/>
            <span>Профиль</span>
          </Button>
        </Link>
      )}
    </div>
  );
};