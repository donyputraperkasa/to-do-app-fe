// src/types/tag.ts

import { Note } from './note';

export interface Tag {
    id: number;
    name: string;
    notes?: {
        note: Note;
    }[];
}