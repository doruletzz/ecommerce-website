import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/input';

type Props = {
	rating: number;
	onRate: (rating: number) => void;
};

type HalfStarIconProps = {
	floating: number;
};

const HalfStarIcon = ({ floating }: HalfStarIconProps) => {
	if (floating < 0.25) return <FontAwesomeIcon icon={faStarOutline} />;
	if (floating > 0.25 && floating < 0.75)
		return <FontAwesomeIcon icon={faStarHalfStroke} />;

	return <FontAwesomeIcon icon={faStar} />;
};

const RatingComponent = ({ rating, onRate }: Props) => {
	const [stars, setStars] = useState(0);

	useEffect(() => {
		setStars(Math.max(Math.min(5, rating), 0));
	}, [rating]);

	return (
		<div>
			<div>
				{stars &&
					[...new Array(Math.floor(stars))].map((_, index) => (
						<Button
							id='rating-star'
							key={index}
							onClick={() => onRate(index + 1)}
						>
							<FontAwesomeIcon icon={faStar} />
						</Button>
					))}
				{stars && stars !== Math.floor(stars) && (
					<Button
						id='rating-star'
						onClick={() => onRate(Math.ceil(stars) + 1)}
					>
						<HalfStarIcon floating={stars - Math.floor(stars)} />
					</Button>
				)}
				{stars &&
					[...new Array(5 - Math.ceil(stars))].map((_, index) => (
						<Button
							id='rating-star'
							key={index}
							onClick={() => onRate(5 - index)}
						>
							<FontAwesomeIcon icon={faStarOutline} />
						</Button>
					))}
			</div>
		</div>
	);
};

export default RatingComponent;
