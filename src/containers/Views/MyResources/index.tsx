import Header from '@/components/Header';
import Menu from '@/components/Sidebar';

export function MyResourcesView() {
	return (
		<>
			<div className="flex flex-row w-full h-full">
				<div className="w-[350px]">
					<Menu />
				</div>
				<div className="w-full">
					<Header title="Mis recursos" />
				</div>
			</div>
		</>
	);
}
