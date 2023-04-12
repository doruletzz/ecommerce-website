import { useAppSelector } from '@/features/app/hooks';
import {
	faPerson,
	faSearch,
	faShoppingCart,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { Field, Input } from '..';

const Navbar = () => {
	const { totalQuantity } = useAppSelector((state) => state.cart);

	const [searchValue, setSearchValue] = useState<string | null>(null);

	return (
		<nav className='flex w-full h-20 items-center px-9 justify-between'>
			<div>
				<Link href='/'>logo</Link>
			</div>
			<ul className='flex gap-4'>
				<li className=''>
					<Link href='/login'>
						<FontAwesomeIcon icon={faUser} />
					</Link>
				</li>
				<li className='relative'>
					<FontAwesomeIcon icon={faShoppingCart} />
					{totalQuantity > 0 && (
						<div className='absolute -top-1.5 -right-1.5 bg-red-600 text-xs rounded-full w-4 h-4 text-center text-slate-200 pointer-events-none'>
							{totalQuantity}
						</div>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
