export interface Students {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface Teachers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface Appointments {
    id: number;
    date: string;
    time: string;
    teacher_id: number;
    student_id: number;
}