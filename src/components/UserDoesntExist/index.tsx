export const UserDoesntExist = () => {
	return (
		<div className="bg-green-200 min-h-screen flex justify-center items-center relative">
			<img
				src="/images/error_image.png"
				alt="Error"
				className="absolute left-0 top-0 w-1/2 h-full"
			/>

			<div className="p-8 absolute right-0 mr-16 flex flex-col justify-center items-center">
				<h1 className="text-3xl font-bold mb-4">
					Ups! Parece que hubo un problema.
				</h1>
				<p className="text-lg text-gray-800">
					El usuario no existe o no tiene recursos disponibles.
				</p>
				<p className="text-lg text-gray-800">¡Inténtalo de nuevo!</p>
				<p className="text-sm text-gray-600">Error 404</p>
			</div>
		</div>
	);
};
