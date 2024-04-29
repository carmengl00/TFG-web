import { paths } from '@/globals/paths';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderProps {
	title: string;
}

const Header = ({ title }: HeaderProps) => {
	return (
		<div className="mt-16">
			<div className="flex flex-row">
				<h1 className="flex-1 font-bold text-5xl text-teal-600 ml-32">
					{title}
				</h1>
				<div className="mr-10">
					<Link href={paths.public.home}>
						<Avatar className="h-24 w-24">
							<AvatarImage src="/images/logo.png" />
							<AvatarFallback>Z1</AvatarFallback>
						</Avatar>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
