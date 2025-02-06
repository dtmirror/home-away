'use client';
import { Input } from '../ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

function NavSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (!searchParam) {
      setSearch('');
    }
  }, [searchParams]);

  return (
    <Input
      type='text'
      placeholder='Search...'
      className='max-w-xs dark:bg-muted'
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}

export default NavSearch;
