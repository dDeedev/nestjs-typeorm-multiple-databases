import { EmployeeInterface } from "./emp.interface";
export interface CarInterface{
    id?: number;
    license_plate?: string;
    qrcode_id?: string;
    province?: string;
    type?: string;
    isCheckIn? :boolean;
    zone?: string;
    bay?: string;
    emp?: EmployeeInterface;
}