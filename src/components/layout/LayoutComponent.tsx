import Head from 'next/head';
import React, { ReactNode } from 'react';
import Navbar from './NavbarComponent';
import Footer from './FooterComponent';

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div>
			<Head>
				<title>KeyCaps</title>
			</Head>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
