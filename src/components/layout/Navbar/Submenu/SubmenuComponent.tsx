import { client } from '@/lib/sanityClient';
import { Category } from '@/types/Category';
import { Slug } from '@/types/Slug';
import Link from 'next/link';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import CategorySubmenuSectionComponent from './CategorySubmenuSectionComponent';
import { User } from '@supabase/auth-helpers-nextjs';
import AccountSubmenuSectionComponent from './AccountSubmenuSectionComponent';

type Props = {
	show: boolean;
	category?: Category | null;
	user?: User | null;
	anchor: number;
	onMouseEnter?: MouseEventHandler;
	onMouseLeave?: MouseEventHandler;
};

const SubmenuComponent = ({
	show,
	category,
	user,
	anchor,
	onMouseEnter,
	onMouseLeave,
}: Props) => {
	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{
				left: anchor,
			}}
			className='absolute top-full -translate-x-1/2 transition-[left/height] duration-700 ease-in-out-expo'
		>
			<div
				className={`${
					show
						? 'animate-slide-up-and-fade-in'
						: 'animate-slide-down-and-fade-out'
				} mt-1 rounded border border-slate-700 bg-slate-100 p-4`}
			>
				{category && (
					<CategorySubmenuSectionComponent category={category} />
				)}
				{user && <AccountSubmenuSectionComponent user={user} />}
			</div>
		</div>
	);
};

const Submenu = SubmenuComponent;
export default Submenu;
