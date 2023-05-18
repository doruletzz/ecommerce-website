import { useAppSelector } from '@/features/app/hooks';
import {
	faBars,
	faHamburger,
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
import Submenu from './Submenu/SubmenuComponent';
import { Category } from '@/types/Category';
import { client } from '@/lib/sanityClient';
import { Cart } from '@/components/cart';
import { User, useSession, useUser } from '@supabase/auth-helpers-react';
import LogoComponent from './LogoComponent';
import { useDebounce } from '@/hooks/useDebounce';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const Navbar = () => {
	const session = useSession();
	const user = useUser();

	const [showUser, setShowUser] = useState(false);

	const { totalQuantity } = useAppSelector((state) => state.cart);
	const [categories, setCategories] = useState<Category[]>([]);

	const [searchValue, setSearchValue] = useState<string | null>(null);
	const [showSearchboxModal, setShowSearchboxModal] =
		useState<boolean>(false);
	const [showCartModal, setShowCartModal] = useState<boolean>(false);
	const [submenuCategory, setSubmenuCategory] = useState<Category | null>();
	const [showSubmenu, setShowSubmenu] = useState<boolean>(false);
	const debouncedSubmenuCategory = useDebounce(submenuCategory, 2000);
	const [submenuAnchor, SetSubmenuAnchor] = useState<number | null>();
	const [scrollTop, setScrollTop] = useState(0);

	const [isSmall, setIsSmall] = useState(false);
	const [width] = useWindowDimensions();

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
			<div className='sticky top-0 overflow-hidden border-b border-slate-900 bg-orange-400 text-slate-900'>
				<Ticker onClose={() => alert('closed')}>
					{'30% OFF WITH CODE:"KEYZ"'}
				</Ticker>
			</div>
			<div
				className={`relative ${
					isSmall ? 'mb-4 h-12  border border-b-slate-700' : 'h-16'
				} flex items-center rounded-b bg-slate-100 transition-all duration-700 ease-in-out-expo`}
			>
				<nav
					className={`flex h-8 w-full items-center justify-between px-9 py-1`}
				>
					<Button className='block flex-1 md:hidden' variant='text'>
						<FontAwesomeIcon icon={faBars} />
					</Button>
					<div className='flex flex-1 justify-center font-display transition-[flex-grow] duration-1000 md:justify-start'>
						<Link
							href='/'
							className='flex items-center gap-2 text-xl font-extrabold text-slate-900'
						>
							<LogoComponent isSmall={isSmall} />
							{isSmall || width < 768 ? (
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
						className='hidden h-full flex-1 justify-center gap-6 md:flex'
						onMouseLeave={() => setShowSubmenu(false)}
					>
						{categories.map((category) => (
							<li key={category.slug.current} className='h-full'>
								<Link
									onMouseEnter={(e) => {
										setShowSubmenu(true);
										setSubmenuCategory(category);
										setShowUser(false);
										const anchor = getAnchor(e);
										SetSubmenuAnchor(anchor);
									}}
									className={`grid h-full place-items-center rounded px-4 hover:border hover:border-slate-700 ${
										debouncedSubmenuCategory?._id ===
											category._id ||
										submenuCategory?._id === category._id
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
					<ul className='flex h-full flex-1 justify-end gap-4'>
						<li className='h-full'>
							<Button
								variant='text'
								id='search'
								className='flex h-full place-items-center gap-3 rounded px-1 transition-all duration-700 ease-in-out-expo hover:border hover:border-slate-700 md:px-3'
								onClick={() =>
									setShowSearchboxModal((prev) => !prev)
								}
							>
								<FontAwesomeIcon icon={faSearch} />
								<p className='hidden animate-slide-up-and-fade-in md:block'>
									Search
								</p>
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
						<li
							className='aspect-square h-full'
							onMouseLeave={() => setShowSubmenu(false)}
						>
							<Link
								onMouseEnter={(e) => {
									setShowSubmenu(!!user);
									setShowUser(!!user);
									setSubmenuCategory(null);
									const anchor = getAnchor(e);
									SetSubmenuAnchor(anchor);
								}}
								className='grid h-full w-full place-items-center rounded hover:border hover:border-slate-700'
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
								className={`aspect grid aspect-square h-full place-items-center rounded hover:border hover:border-slate-700 ${
									!totalQuantity
										? 'bg-transparent'
										: 'border border-slate-700 bg-orange-600'
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
				{(debouncedSubmenuCategory || submenuAnchor || showUser) && (
					<Submenu
						show={showSubmenu}
						onMouseEnter={() => setShowSubmenu(true)}
						onMouseLeave={() => setShowSubmenu(false)}
						category={submenuCategory}
						user={showUser ? user : null}
						anchor={submenuAnchor ?? 0}
					/>
				)}
			</div>
		</>
	);
};

export default Navbar;
