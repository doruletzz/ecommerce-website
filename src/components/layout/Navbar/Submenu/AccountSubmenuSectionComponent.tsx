import { User } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import React from 'react';

type Props = {
	user: User;
};

const AccountSubmenuSectionComponent = ({ user }: Props) => {
	return (
		<ul className='flex flex-col gap-1'>
			<li className='text whitespace-nowrap font-display font-bold'>
				My Account
			</li>
			<li>
				<Link href='/account'>Profile</Link>
			</li>
			<li>
				<Link href='/settings'>Settings</Link>
			</li>
			<li>
				<Link href='/orders'>Orders</Link>
			</li>
			<li>
				<Link href='/logout'>Sign Out</Link>
			</li>
		</ul>
	);
};

export default AccountSubmenuSectionComponent;
