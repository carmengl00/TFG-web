interface SummaryProps {
	dataReservation: DataReservation;
}

export const Summary = ({ dataReservation }: SummaryProps) => {
	return (
		<>
			<div className="flex flex-col mt-32 items-center">
				<div className="flex flex-row justify-between w-2/3">
					<div className="flex flex-col text-2xl font-bold flex-shrink-0 w-1/3">
						Reservado por:
					</div>
					<div className="flex flex-col text-2xl ml-10 w-2/3">
						{dataReservation.name}
						<br />
						{dataReservation.email}
					</div>
				</div>
				<div className="flex flex-row mt-14 justify-between w-2/3">
					<div className="flex flex-col text-2xl font-bold flex-shrink-0 w-1/3">
						Nota:
					</div>
					<div
						className="flex flex-col text-2xl ml-10 w-2/3 overflow-y-auto"
						style={{ maxHeight: '200px' }}
					>
						{dataReservation.description}
					</div>
				</div>
			</div>
		</>
	);
};
