'use client';

import Auth from '@/components/Auth';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RootLayout from '@/containers/Layout/Forms';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useConnect } from './connect';

export function SignInView() {
	const { form, onSubmit } = useConnect();

	const getFirstError = () => {
		const errors = Object.values(form.formState.errors);
		const firstError = errors.find(
			(error) => error && error.message === 'Please, enter valid credentials'
		);
		return firstError ? firstError.message : null;
	};

	return (
		<RootLayout>
			<Auth imageSrc="/images/inicio_sesion.png">
				<div className="mx-auto bg-gray-200 p-8 rounded-3xl shadow-md w-full md:w-2/5">
					<p className="text-center text-2xl">Inicia sesión</p>
					<div className="mx-auto bg-white p-8 rounded-3xl shadow-md w-full">
						<Form {...form}>
							<form onSubmit={onSubmit} className="w-full">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="mail@example.com"
													type="email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="mb-4">
											<FormLabel>Contraseña</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="Enter your password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="text-right">
									<Link className="text-teal-600 text-sm" href="/">
										¿Has olvidado tu contraseña?
									</Link>
								</div>
								<br />
								<div className="text-center">
									<Button disabled={form.formState.isSubmitting} type="submit">
										INICIAR SESIÓN
									</Button>
									{getFirstError() && (
										<p className="text-red-500">{getFirstError()}</p>
									)}
								</div>
							</form>
							<div
								className="mx-auto my-4 flex w-full items-center justify-evenly
                            before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
                            after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
							>
								o
							</div>
							<p className="text-center text-sm text-black mt-2">
								¿No tienes cuenta?
								<Link className="text-teal-600" href="/register">
									{' '}
									Regístrate
								</Link>
							</p>
						</Form>
					</div>
				</div>
			</Auth>
		</RootLayout>
	);
}
