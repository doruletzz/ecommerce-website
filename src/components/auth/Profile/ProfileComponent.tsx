import { useUser } from '@supabase/auth-helpers-react';
import React, { useEffect } from 'react';

const ProfileComponent = () => {
	const user = useUser();

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<div>
			<h3>My Account:</h3>
			<p>{user?.email}</p>
		</div>
	);
};

export default ProfileComponent;
