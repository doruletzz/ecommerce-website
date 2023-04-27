import { useAppSelector } from '@/features/app/hooks';
import {
	faPerson,
	faSearch,
	faShoppingCart,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, {
	MouseEvent,
	MouseEventHandler,
	useEffect,
	useState,
} from 'react';
import { Badge, Field, Input } from '../../input';
import { Button } from '../../input';
import {
	DESKMATS_ROUTE,
	KEYBOARD_ROUTE,
	KEYCAPS_ROUTE,
} from '@/constants/paths';
import { Modal, Ticker } from '..';
import { SearchBox } from '@/components/product';
import Submenu from './SubmenuComponent';
import { Category } from '@/types/Category';
import { client } from '@/lib/client';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import category from '../../../../sanity-ecommerce/schemas/category';

const Navbar = () => {
	const { totalQuantity } = useAppSelector((state) => state.cart);
	const [categories, setCategories] = useState<Category[]>([]);

	const [searchValue, setSearchValue] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

	const [showSubMenu, setShowSubMenu] = useState(false);
	const [scrollTop, setScrollTop] = useState(0);

	const [isSmall, setIsSmall] = useState(false);

	useEffect(() => {
		const handleScroll = (event: Event) => {
			if (window.scrollY > scrollTop && window.scrollY > 30)
				setScrollTop((prev) => {
					setIsSmall(window.scrollY > prev);
					return window.scrollY;
				});
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			const query = '*[_type == "category"]';
			const categories = await client.fetch<Category[]>(query);

			setCategories(categories);
		};

		if (categories.length === 0) fetchCategories();
	}, []);

	return (
		<>
			<div className='sticky top-0 bg-orange-400 text-slate-50  overflow-hidden'>
				<Ticker>30% OFF WITH CODE: KEYZ</Ticker>
			</div>
			<div
				className={`relative ${isSmall ? 'h-12' : 'h-16'} bg-slate-200`}
				onMouseLeave={() => setShowSubMenu(false)}
			>
				<nav
					className={`flex w-full  ${
						isSmall ? 'h-12' : 'h-16'
					} items-center px-9 justify-between`}
				>
					<div className='flex-1 font-display font-extrabold '>
						<Link href='/'>KEYCAPS</Link>
					</div>
					<ul className='flex justify-center gap-6 flex-1'>
						{categories.map((category) => (
							<li key={category.slug.current}>
								<Link
									onMouseEnter={() => setShowSubMenu(true)}
									className='grid rounded hover:border-slate-700 hover:border px-4 h-8 place-items-center'
									href={`/store/${
										category.slug?.current ?? ''
									}`}
								>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
					<ul className='flex gap-6 justify-end flex-1'>
						<li>
							<Button
								id='search'
								className='flex gap-3 rounded hover:border-slate-700 h-8 hover:border px-3 place-items-center'
								onClick={() => setShowModal((prev) => !prev)}
							>
								<FontAwesomeIcon icon={faSearch} />
								<p>Search</p>
							</Button>
							{showModal && (
								<Modal
									onBackdropClick={() => setShowModal(false)}
								>
									<SearchBox />
								</Modal>
							)}
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
							<Link
								href='/cart'
								id='cart'
								className='grid relative rounded hover:border-slate-700 hover:border w-8 h-8 place-items-center'
							>
								{totalQuantity > 0 ? (
									<Badge badgeContent={totalQuantity}>
										<FontAwesomeIcon
											icon={faShoppingCart}
										/>
									</Badge>
								) : (
									<FontAwesomeIcon icon={faShoppingCart} />
								)}
							</Link>
						</li>
					</ul>
				</nav>
				{showSubMenu && <Submenu />}
			</div>
		</>
	);
};

export default Navbar;
