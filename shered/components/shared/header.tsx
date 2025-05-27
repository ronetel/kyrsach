'use client';

import React from 'react';
import { Button } from '../ui/button';
import { AuthModal } from './modals/auth-modal';
import { ProfileButton } from './profile-button';
import Link from 'next/link';
import { SearchInput } from './search-input';

interface Props {
  hasSearch?: boolean;
}
const Header: React.FC<Props> = ({ hasSearch = true }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  return (
    <header className="bg-mint-500 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-8 max-w-[1280px]">
        <Link href={'/'}>
          <div className="flex items-center space-x-2 cursor-pointer">
            <h1 className="text-2xl md:text-2xl font-dela">GREEN BITE</h1>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
