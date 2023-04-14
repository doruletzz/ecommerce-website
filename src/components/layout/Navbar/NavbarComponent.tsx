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
import { Badge, Field, Input } from '../../input';
import { Button } from '../../input';

const Navbar = () => {
	const { totalQuantity } = useAppSelector((state) => state.cart);

	const [searchValue, setSearchValue] = useState<string | null>(null);

	return (
		<nav className='flex w-full h-20 items-center px-9 justify-between'>
			<div className='flex-1'>
				<Link href='/'>logo</Link>
			</div>
			<ul className='flex justify-center gap-6 flex-1'>
				<li>
					<Link
						className='grid rounded hover:border-slate-700 hover:border px-4 h-8 place-items-center'
						href='/store/keyboards'
					>
						Mechanical Keyboards
					</Link>
				</li>
				<li>
					<Link
						className='grid rounded hover:border-slate-700 hover:border px-4 h-8 place-items-center'
						href='/store/keycaps'
					>
						Keycaps
					</Link>
				</li>
				<li>
					<Link
						className='grid rounded hover:border-slate-700 hover:border px-4 h-8 place-items-center'
						href='/store/deskmats'
					>
						Deskmats
					</Link>
				</li>
			</ul>
			<ul className='flex gap-6 justify-end flex-1'>
				<li>
					<Button className='flex gap-3 rounded hover:border-slate-700 h-8 hover:border px-3 place-items-center'>
						<FontAwesomeIcon icon={faSearch} />
						<p>Search</p>
					</Button>
				</li>
				<li>
					<Link
						className='grid rounded hover:border-slate-700 hover:border w-8 h-8 place-items-center'
						href='/login'
					>
						<FontAwesomeIcon icon={faUser} />
					</Link>
				</li>
				<li>
					<Button className='grid relative rounded hover:border-slate-700 hover:border w-8 h-8 place-items-center'>
						{totalQuantity > 0 ? (
							<Badge badgeContent={totalQuantity}>
								<FontAwesomeIcon icon={faShoppingCart} />
							</Badge>
						) : (
							<FontAwesomeIcon icon={faShoppingCart} />
						)}
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
