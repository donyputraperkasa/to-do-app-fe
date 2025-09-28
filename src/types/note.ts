export interface Note {
    id: number;
    title: string;
    content: string;
    tags?: { tag: { id: number; name: string } }[];
    user?: { id: number; email: string };
}