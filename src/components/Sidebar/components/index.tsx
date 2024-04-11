'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavProps {
	links: {
		title: string;
		label?: string;
		icon: LucideIcon;
		variant: 'default' | 'ghost';
		href: string;
	}[];
}

export function Nav({ links }: NavProps) {
	return (
		<div className="group flex flex-col gap-4 py-2">
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{links.map((link, index) => (
					<Link
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						href={link.href}
						className={cn(
							buttonVariants({ variant: link.variant, size: 'sm' }),
							link.variant === 'default' &&
								'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
							'justify-start'
						)}
					>
						<link.icon className="mr-2 h-4 w-4" />
						{link.title}
						{link.label && (
							<span
								className={cn(
									'ml-auto',
									link.variant === 'default' &&
										'text-background dark:text-white'
								)}
							>
								{link.label}
							</span>
						)}
					</Link>
				))}
			</nav>
		</div>
	);
}
