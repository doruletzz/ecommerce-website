import { useUser } from '@supabase/auth-helpers-react';
import React, { useEffect } from 'react';

const ProfileComponent = () => {
	const user = useUser();

	return (
		<div>
			<h3>My Account:</h3>
			<p>{user?.email}</p>
		</div>
	);
};

export default ProfileComponent;
