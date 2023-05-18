import Head from 'next/head';
import React, { ReactNode } from 'react';
import Navbar from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterComponent';

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div className='flex min-h-screen flex-col bg-slate-100'>
			<Head>
				<title>KeyCaps</title>
			</Head>
			<header className='sticky bottom-0 top-0 z-50'>
				<Navbar />
			</header>
			<main className='bg-slate-100'>{children}</main>
			<footer className='flex flex-1 items-end bg-slate-100'>
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
