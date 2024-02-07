import { SyntheticEvent } from 'react';

// This wrapper receives a function that returns a promise, and returns a function that handles the promise in a proper way
// This way we avoid eslint complaints avoid misused/floating promises (https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md)

// This problem affects to React Hook Form but also to any event you want to pass a function directly
// Ex:
// <button onClick={myFunctionReturningPromise} />
// <Form onSubmit={myHandleSubmitReturningPromise} />

// We can bypass this by simply:
// <button onClick={()=> void myFunctionReturningPromise()} />
// or modifying eslint config to `'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }]`

// But the eslint complaint is correct and ultimately we don't want to do this

// Related github issues
// https://github.com/typescript-eslint/typescript-eslint/issues/4619
// github.com/react-hook-form/react-hook-form/discussions/8020

export function onPromise<T>(promise: (event?: SyntheticEvent) => Promise<T>) {
	return (event?: SyntheticEvent) => {
		if (promise) {
			promise(event).catch(() => {
				throw new Error('Unexpected error');
			});
		}
	};
}
