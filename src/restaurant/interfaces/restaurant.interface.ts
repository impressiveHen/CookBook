import { Document } from 'mongoose';
export interface Restaurant extends Document {
    readonly name: string;
    readonly rate: number;
    readonly address: string;
    readonly category: string;
}