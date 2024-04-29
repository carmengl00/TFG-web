import { paths } from '@/globals/paths';
import { useAuthActions } from '@/graphql/auth/useAuthActions';
import { resetTokens } from '@/graphql/auth/utils';
import { useUsersActions } from '@/graphql/hooks/users/useUsersActions';
import { isGraphqlMessageError } from '@/utils/isGraphqlMessageError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FormSchema } from './constants';

interface ProfileFormProps {
	firstName: string;
	lastName: string;
	email: string;
	publicName: string;
}

export const ProfileForm = ({
	firstName,
	lastName,
	email,
	publicName,
}: ProfileFormProps) => {
	const { updateUser } = useUsersActions();
	const { handleLogout } = useAuthActions();
	const [emailChange, setEmailChange] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			publicName: publicName,
		},
	});

	useEffect(() => {
		form.setValue('firstName', firstName);
		form.setValue('lastName', lastName);
		form.setValue('email', email);
		form.setValue('publicName', publicName.toLowerCase());
	}, [form, firstName, lastName, email, publicName]);

	const { push } = useRouter();

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		updateUser({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			publicName: data.publicName,
		})
			.then(() => {
				if (emailChange) {
					handleLogout();
					push(paths.public.signIn);
					resetTokens();
					window.location.reload();
				} else {
					push(paths.public.home);
					window.location.reload();
				}
			})
			.catch((error) => {
				if (isGraphqlMessageError(error)) {
					setErrorMessage(error.message);
				}
			});
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit(onSubmit)(e);
					}}
					className="w-full mt-16 flex flex-row"
				>
					<div className="ml-10 w-2/5">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input type="firstName" {...field} />
									</FormControl>
									<FormDescription>Edita tu nombre.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="mt-10">
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apellidos</FormLabel>
										<FormControl>
											<Input type="lastName" {...field} />
										</FormControl>
										<FormDescription>Edita tus apellidos.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="mt-10 mb-5">
							<Button type="submit">Guardar</Button>
							{errorMessage && (
								<p className="mt-5 text-red-400">{errorMessage}</p>
							)}
						</div>
					</div>
					<div className="w-2/5 ml-10">
						<FormField
							control={form.control}
							name="publicName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre público</FormLabel>
									<FormControl>
										<Input type="publicName" {...field} />
									</FormControl>
									<FormDescription>
										Edita el nombre que verá el resto de usuarios al reservar un
										recurso.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="mt-10">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												onChange={(e) => {
													field.onChange(e);
													setEmailChange(true);
												}}
											/>
										</FormControl>
										<FormDescription>
											<p>Edita el correo electrónico.</p>
											<p className="text-xs text-red-500">
												Si cambias el correo electrónico, se cerrará la sesión.
											</p>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
};
