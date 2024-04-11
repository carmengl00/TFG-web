import { paths } from '@/globals/paths';
import { cn } from '@/lib/utils';
import {
	CalendarClock,
	HelpCircle,
	LogOutIcon,
	Plus,
	Rocket,
	User,
} from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Separator } from '../ui/separator';
import { TooltipProvider } from '../ui/tooltip';
import { Nav } from './components';

interface MenuProps {
	resourcesNumber: number;
}

const Menu = ({ resourcesNumber }: MenuProps) => {
	const router = useRouter();

	const getLinkVariant = (path: string) => {
		if (router.pathname === path) {
			return 'default';
		}
		return 'ghost';
	};

	return (
		<TooltipProvider delayDuration={0}>
			<div className={cn('max-w-screen-sm')}>
				<div
					className={cn('flex h-[52px] items-center justify-center', 'px-2')}
				>
					Menú
				</div>
				<Separator />
				<Nav
					links={[
						{
							title: 'Mis recursos',
							label: String(resourcesNumber),
							icon: Rocket,
							variant: getLinkVariant(paths.public.home),
							href: paths.public.home,
						},
						{
							title: 'Próximos eventos',
							label: '7',
							icon: CalendarClock,
							variant: getLinkVariant(paths.public.home),
							href: paths.public.home,
						},
						{
							title: 'Nuevo recurso',
							icon: Plus,
							variant: getLinkVariant(paths.newResource),
							href: paths.newResource,
						},
					]}
				/>
				<Separator />
				<Nav
					links={[
						{
							title: 'Mi perfil',
							icon: User,
							variant: getLinkVariant(paths.public.home),
							href: paths.public.home,
						},
						{
							title: 'Ayuda',
							icon: HelpCircle,
							variant: getLinkVariant(paths.public.home),
							href: paths.public.home,
						},
					]}
				/>
				<Separator />
				<Nav
					links={[
						{
							title: 'Cerrar sesión',
							icon: LogOutIcon,
							variant: getLinkVariant(paths.public.home),
							href: paths.public.home,
						},
					]}
				/>
			</div>
		</TooltipProvider>
	);
};

export default Menu;
