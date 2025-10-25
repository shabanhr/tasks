"use client";

import {  useQueryState } from 'nuqs'
import { BoardView } from '@/components/board'
import { Button } from '@/components/ui/button';
import { ListView } from '@/components/list';
import { Columns3Icon, ListIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { MoonStar, SunDim } from 'lucide-react';
import React from 'react';

export default function ClientPage() {
    const [view, setView] = useQueryState('view', { defaultValue: 'board' })
    const { setTheme, theme } = useTheme();

    return (
        <div className='space-y-2'>
            <div className='px-4 py-5 flex items-center gap-2'>
                <Button variant={view === 'board' ? 'secondary' : 'ghost'} onClick={() => setView('board')}>
                    <Columns3Icon className='text-muted-foreground' />
                    Board
                </Button>
                <Button variant={view === 'list' ? 'secondary' : 'ghost'} onClick={() => setView('list')}>
                    <ListIcon className='text-muted-foreground' />
                    List
                </Button>
                <Button
                    className='ml-auto'
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    size="icon"
                    variant="ghost"
                >
                    <SunDim className="size-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                    <MoonStar className="dark:-rotate-90 absolute rotate-0 scale-100 dark:scale-0" />
                    <span className="sr-only">Switch Theme</span>
                </Button>
            </div>
            {view === 'board' && <BoardView />}
            {view === 'list' && <ListView />}
        </div>
    )
}
