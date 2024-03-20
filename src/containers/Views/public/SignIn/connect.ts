import { paths } from '@/globals/paths';
import { useAuthActions } from '@/graphql/auth/useAuthActions';
import { isGraphqlMessageError } from '@/utils/isGraphqlMessageError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormSchema, defaultValues } from './constants';
import { FormValues } from './types';

export const useConnect = () => {
	const { handleLogin } = useAuthActions();

	const { push } = useRouter();

	const {
		query: { email },
	} = useRouter();

	const trackedEmail = typeof email === 'string' ? email : undefined;

	const initialValues = useMemo(
		() => ({
			email: trackedEmail ?? defaultValues.email,
			password: defaultValues.password,
		}),
		[trackedEmail]
	);

	const form = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: initialValues,
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		form.reset(initialValues);
	}, [initialValues, form.reset]);

	const onSubmit = async (values: FormValues) => {
		try {
			const response = await handleLogin({
				email: values.email,
				password: values.password,
			});
			if (response) await push(paths.public.home);
		} catch (error) {
			console.error('Error en la solicitud al backend:', error);

			if (isGraphqlMessageError(error)) {
				form.setError('_error' as keyof FormValues, {
					type: 'manual',
					message: 'Please, enter valid credentials',
				});
			}
		}
	};

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
	};
};
