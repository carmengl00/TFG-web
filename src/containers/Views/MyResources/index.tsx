import CustomCard from '@/components/Card';
import Header from '@/components/Header';
import Menu from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';
import { useConnect } from './connect';

export function MyResourcesView() {
	const { resources, loadMore } = useConnect();

	return (
		<>
			<div className="flex flex-row w-full h-full">
				<div className="w-3/12">
					<Menu
						resourcesNumber={
							resources.pageInfo ? resources.pageInfo.totalResults || 0 : 0
						}
					/>
				</div>
				<div className="w-full">
					<Header title="Mis recursos" />
					{resources.edges.map((resource) => (
						<CustomCard
							key={resource.id}
							id={resource.id}
							title={resource.name}
							startDate={new Date(resource.startDate)}
							endDate={new Date(resource.endDate)}
							availableTime={resource.availableTime}
						/>
					))}
					<Button onClick={loadMore} className="ml-5 mt-5">
						<SkipForward />
					</Button>
				</div>
			</div>
		</>
	);
}
