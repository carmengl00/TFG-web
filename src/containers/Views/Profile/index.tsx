import Header from '@/components/Header';
import { ProfileForm } from '@/components/ProfileForm';
import Menu from '@/components/Sidebar';
import { useConnect } from './connect';

export function ProfileView() {
	const { me, resources, reservedSlots } = useConnect();

	return (
		<>
			<div className="flex flex-row w-full h-full">
				<div className="w-3/12">
					<Menu
						resourcesNumber={
							resources.pageInfo ? resources.pageInfo.totalResults || 0 : 0
						}
						reservedSlotsNumber={
							reservedSlots.pageInfo
								? reservedSlots.pageInfo.totalResults || 0
								: 0
						}
					/>
				</div>
				<div className="w-full">
					<Header title="Mi perfil" />
					<ProfileForm
						firstName={me.firstName}
						lastName={me.lastName}
						email={me.email || ''}
						publicName={me.publicName}
					/>
				</div>
			</div>
		</>
	);
}
