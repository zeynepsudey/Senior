export interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
}
export interface Teachers {
    teacher_id: number;
    name: string;
    email: string;
    password: string;
}
export interface Appointments {
    appointment_id: number;
    date: string;
    time: string;
    availability_id: number;
}
export interface Teacher_Availability {
    availability_id: number;
    date: string;
    time: string;
    teacher_id: number;
}