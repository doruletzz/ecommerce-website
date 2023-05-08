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
import { client } from '@/lib/sanityClient';
import { Cart } from '@/components/cart';
import { useSession } from '@supabase/auth-helpers-react';
import LogoComponent from './LogoComponent';

const Navbar = () => {
	const session = useSession();

	const { totalQuantity } = useAppSelector((state) => state.cart);
	const [categories, setCategories] = useState<Category[]>([]);

	const [searchValue, setSearchValue] = useState<string | null>(null);
	const [showSearchboxModal, setShowSearchboxModal] =
		useState<boolean>(false);
	const [showCartModal, setShowCartModal] = useState<boolean>(false);
	const [submenuCategoryId, setSubmenuCategoryId] = useState<string | null>();
	const [submenuCategorySlug, setSubmenuCategorySlug] = useState<
		string | null
	>();
	const [showSubmenu, setShowSubmenu] = useState<boolean>(false);
	const [submenuAnchor, SetSubmenuAnchor] = useState<number | null>();
	const [scrollTop, setScrollTop] = useState(0);

	const [isSmall, setIsSmall] = useState(false);

	useEffect(() => {
		const handleScroll = (event: Event) => {
			setScrollTop(() => {
				setIsSmall(window.scrollY > 90);
				return window.scrollY;
			});
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (!showSubmenu) {
			const timeout = setTimeout(() => {
				setSubmenuCategoryId(null);
				setSubmenuCategorySlug(null);
			}, 500);

			return () => clearTimeout(timeout);
		}
	}, [showSubmenu]);

	useEffect(() => {
		const fetchCategories = async () => {
			const query = '*[_type == "category"]';
			const categories = await client.fetch<Category[]>(query);

			setCategories(categories);
		};

		if (categories.length === 0) fetchCategories();
	}, []);

	const getAnchor = (e: MouseEvent<HTMLAnchorElement>) => {
		const { left, right } = e.currentTarget.getClientRects()[0];
		const middle = (left + right) / 2;

		return middle;
	};

	return (
		<>
			<div className='sticky top-0 bg-orange-400 text-slate-900 overflow-hidden border-b border-slate-900'>
				<Ticker onClose={() => alert('closed')}>
					{'30% OFF WITH CODE:"KEYZ"'}
				</Ticker>
			</div>
			<div
				className={`relative ${
					isSmall ? 'h-12 mb-4  border border-b-slate-700' : 'h-16'
				} bg-slate-100 flex items-center rounded-b transition-all duration-700 ease-in-out-expo`}
			>
				<nav
					className={`flex w-full h-8 items-center px-9 justify-between py-1`}
				>
					<div className='flex-1 font-display'>
						<Link
							href='/'
							className='flex gap-2 items-center text-xl font-extrabold text-slate-900'
						>
							<LogoComponent isSmall={isSmall} />
							{isSmall ? (
								<>
									<LogoComponent isSmall={isSmall} />
									<LogoComponent
										isSmall={isSmall}
										delay={500}
									/>
								</>
							) : (
								<p className='animate-slide-up-and-fade-in'>
									KEYCAPS
								</p>
							)}
						</Link>
					</div>
					<ul
						className='flex justify-center gap-6 flex-1 h-full'
						onMouseLeave={() => setShowSubmenu(false)}
					>
						{categories.map((category) => (
							<li key={category.slug.current} className='h-full'>
								<Link
									onMouseEnter={(e) => {
										setShowSubmenu(true);
										setSubmenuCategoryId(category._id);
										setSubmenuCategorySlug(
											category.slug.current
										);
										const anchor = getAnchor(e);
										SetSubmenuAnchor(anchor);
									}}
									className={`grid h-full rounded hover:border-slate-700 hover:border px-4 place-items-center ${
										submenuCategoryId === category._id
											? 'border border-slate-700'
											: ''
									}`}
									href={`/store/${
										category.slug?.current ?? ''
									}`}
								>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
					<ul className='flex gap-4 justify-end flex-1 h-full'>
						<li className='h-full'>
							<Button
								variant='text'
								id='search'
								className='flex gap-3 rounded hover:border-slate-700 hover:border px-3 h-full place-items-center'
								onClick={() =>
									setShowSearchboxModal((prev) => !prev)
								}
							>
								<FontAwesomeIcon icon={faSearch} />
								<p>Search</p>
							</Button>
							{showSearchboxModal && (
								<Modal
									onBackdropClick={() =>
										setShowSearchboxModal(false)
									}
								>
									<SearchBox />
								</Modal>
							)}
						</li>
						<li className='aspect-square h-full'>
							<Link
								className='grid rounded hover:border-slate-700 hover:border w-full h-full place-items-center'
								href={session?.user ? '/account' : '/login'}
							>
								<FontAwesomeIcon icon={faUser} />
							</Link>
						</li>
						<li className='aspect-square h-full'>
							<Button
								id='cart'
								onClick={() => setShowCartModal(true)}
								variant='text'
								className={`aspect aspect-square grid relative rounded hover:border-slate-700 hover:border h-full place-items-center ${
									!!!totalQuantity
										? 'bg-transparent'
										: 'bg-orange-600 border-slate-700 border'
								}`}
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
							</Button>
							{showCartModal && (
								<Modal
									onBackdropClick={() =>
										setShowCartModal(false)
									}
								>
									<Cart
										isModal={true}
										onClose={() => setShowCartModal(false)}
									/>
								</Modal>
							)}
						</li>
					</ul>
				</nav>
				{submenuCategoryId && submenuCategorySlug && (
					<Submenu
						onMouseEnter={() => setShowSubmenu(true)}
						onMouseLeave={() => setShowSubmenu(false)}
						categoryId={submenuCategoryId}
						categorySlug={submenuCategorySlug}
						anchor={submenuAnchor ?? 0}
					/>
				)}
			</div>
		</>
	);
};

export default Navbar;
