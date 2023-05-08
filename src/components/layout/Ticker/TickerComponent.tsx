import { Button } from '@/components/input';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
	MouseEventHandler,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react';

type Props = {
	children: ReactNode;
	onClose?: MouseEventHandler;
};

const TickerComponent = ({ children, onClose }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const elementRef = useRef<HTMLDivElement>(null);

	const [toRepeatCount, setToRepeatCount] = useState(0);
	const [totalWidth, setTotalWidth] = useState(0);

	useEffect(() => {
		if (containerRef.current && elementRef.current) {
			const toRepeatCount = Math.max(
				0,
				Math.floor(
					(2 * containerRef.current?.clientWidth) /
						elementRef.current?.clientWidth
				)
			);
			setToRepeatCount(toRepeatCount);
			setTotalWidth(toRepeatCount * elementRef.current?.clientWidth);
		}
	}, [containerRef.current, elementRef.current]);

	useEffect(() => {
		if (containerRef.current && totalWidth) {
			containerRef.current.style.setProperty(
				'--infinite-scroll-total-width',
				`-${totalWidth / 2}px`
			);
		}
	}, [containerRef.current, totalWidth]);

	return (
		<div className='flex'>
			<div
				ref={containerRef}
				className='animate-inifinte-scroll flex font-display tracking-tighter flex-1'
			>
				<div className='whitespace-nowrap p-1' ref={elementRef}>
					{children}
				</div>
				{toRepeatCount > 0 &&
					[...Array(toRepeatCount)].map((_, index) => (
						<div key={index} className='whitespace-nowrap p-1'>
							{children}
						</div>
					))}
			</div>
			{onClose && (
				<Button id='close' variant='text' onClick={onClose}>
					<FontAwesomeIcon icon={faClose} />
				</Button>
			)}
		</div>
	);
};

export default TickerComponent;
