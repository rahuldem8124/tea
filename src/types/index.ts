export type QualityGrade = "A+" | "A" | "B" | "C";
export type MachineStatus = "Active" | "Maintenance" | "Broken";
export type EmployeeRole =
  | "Picker"
  | "Sorter"
  | "Operator"
  | "Driver"
  | "Supervisor"
  | "Manager";
export type Shift = "Morning" | "Afternoon" | "Night";

export interface LeafEntry {
  id: string;
  farmerName: string;
  date: string;
  quantityKg: number;
  qualityGrade: QualityGrade;
  pricePerKg: number;
  totalCost: number;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: MachineStatus;
  lastMaintenanceDate: string;
  nextMaintenanceDue: string;
  isRental: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  shift: Shift;
  attendance: boolean;
  salary: number;
  joinDate: string;
}

export interface Sale {
  id: string;
  buyerName: string;
  date: string;
  quantityKg: number;
  pricePerKg: number;
  totalRevenue: number;
}

export interface KPIData {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  totalProduction: number;
}

export interface ActivityItem {
  id: string;
  type: "leaf" | "sale" | "machine" | "employee";
  message: string;
  time: string;
}

export interface ChartDataPoint {
  date: string;
  collection: number;
  sales: number;
  profit: number;
}

export interface BuyerData {
  name: string;
  revenue: number;
}
