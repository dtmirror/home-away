'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuSquarePen } from 'react-icons/lu';

type btnSize = 'default' | 'sm' | 'lg';
type actionType = 'edit' | 'delete';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuSquarePen />;
      case 'delete':
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'>
      {pending ? <ReloadIcon className='animate-spin' /> : renderIcon()}
    </Button>
  );
};

export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={size}
      className={`capitalize ${className}`}
      disabled={pending}>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild>
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'>
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isFavorite ? (
        <FaHeart className='text-red-600' />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};
