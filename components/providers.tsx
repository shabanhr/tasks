'use client';

import * as React from 'react';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: Omit<ThemeProviderProps, 'children'>;
}

export function RootProviders({ children, themeProps }: ProvidersProps) {
	return (
		<ThemeProvider {...themeProps}>
			<NuqsAdapter>
				{children}
			</NuqsAdapter>
		</ThemeProvider>
	);
}
