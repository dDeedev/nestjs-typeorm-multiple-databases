import { CarInterface } from "./car.interface";

export interface EmployeeInterface {
    id?: number;
    emp_id?: string;
    card_id?: string;
    name?: string;
    department?: string;
    car?: CarInterface[];
}