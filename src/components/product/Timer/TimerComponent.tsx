import React, { useEffect, useState } from 'react';

type Time = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

type Props = {
	duration: Time;
};

const TimerComponent = ({ duration }: Props) => {
	const [localDuration, setLocalDuration] = useState<Time>();

	useEffect(() => {
		setLocalDuration(duration);

		const interval = setInterval(
			() =>
				setLocalDuration((prev) => {
					// TODO: fix logic
					const newTime: Time = {
						days:
							prev?.seconds || prev?.minutes || prev?.hours
								? prev?.days
								: Math.max(0, prev?.days ?? 0 - 1),
						hours:
							prev?.seconds || prev?.minutes
								? prev.hours
								: Math.max(0, prev?.hours ?? 0 - 1),
						minutes: prev?.seconds
							? prev.minutes
							: Math.max(0, prev?.minutes ?? 0 - 1),
						seconds: Math.max(0, prev?.seconds ?? 0 - 1),
					};

					return newTime;
				}),
			1000
		);

		return () => clearInterval(interval);
	}, [duration]);

	return <div>TimerComponent</div>;
};

export default TimerComponent;
