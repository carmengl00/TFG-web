import { paths } from '@/globals/paths';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderReservationProps {
	title: string;
}

const HeaderReservation = ({ title }: HeaderReservationProps) => {
	return (
		<div className="mt-16 mx-auto w-max">
			<div className="flex flex-row items-center justify-center">
				<div>
					<Link href={paths.public.signIn}>
						<Avatar className="h-24 w-24">
							<AvatarImage src="/images/logo.png" />
							<AvatarFallback>Z1</AvatarFallback>
						</Avatar>
					</Link>
				</div>
				<h1 className="flex-1 font-bold text-5xl text-teal-600 ml-10">
					{title}
				</h1>
			</div>
		</div>
	);
};

export default HeaderReservation;
