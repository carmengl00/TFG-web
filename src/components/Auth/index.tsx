import Image from 'next/image';
import React, { ReactNode } from 'react';

interface AuthProps {
	children: ReactNode;
	imageSrc: string;
}

const Auth = ({ children, imageSrc }: AuthProps) => {
	return (
		<div className="bg-teal-600 h-screen w-screen">
			<div className="bg-teal-600 mt-5 flex flex-col items-center p-8">
				{imageSrc && (
					<Image
						src={imageSrc}
						width={350}
						height={350}
						className="mx-auto"
						alt="Image"
					/>
				)}
				{children}
			</div>
		</div>
	);
};

export default Auth;
