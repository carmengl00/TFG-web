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
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>Z1</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</div>
	);
};

export default Header;
