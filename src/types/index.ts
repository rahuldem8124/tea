export type QualityGrade = "A+" | "A" | "B" | "C";
export type MachineStatus = "Active" | "Maintenance" | "Broken" | "Idle";
export type TeaGrade = "BOP" | "BOPF" | "FBOP" | "PEKOE" | "Dust 1" | "OP";
export type ProcessStage = "Withering" | "Rolling" | "Fermentation" | "Drying" | "Sorting" | "Packaging";

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
  collectionTime: string;
  batchId: string;
  quantityKg: number;
  qualityGrade: QualityGrade; // Raw leaf quality
  moistureContent: number;
  finePluckingPercentage: number;
  pricePerKg: number;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: MachineStatus;
  stage: ProcessStage;
  currentBatchId?: string;
  loadPercentage?: number;
  temperature?: number;
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

export interface ProcessingBatch {
  id: string;
  machineId: string;
  inputQtyKg: number;
  startTime: string;
  endTime?: string;
  outputQtyKg?: number;
  status: "pending" | "processing" | "completed";
  wastagePercentage?: number;
}

export interface GradingRecord {
  id: string;
  batchId: string;
  grades: {
    gradeA: number; // kg
    gradeB: number;
    gradeC: number;
  };
  date: string;
}

export interface PackagingRecord {
  id: string;
  batchId: string;
  packageType: "Bags" | "Boxes";
  weightPerPackage: number; // kg
  totalPackages: number;
}

export type TruckStatus = "loading" | "dispatched" | "in_transit" | "delivered";

export interface TruckDispatch {
  id: string;
  truckId: string;
  driverName: string;
  destinationGodown: string;
  loadDetails: {
    batchId: string;
    grade: string;
    quantity: number;
  }[];
  departureTime: string;
  estimatedArrivalTime: string;
  status: TruckStatus;
}

export interface Godown {
  id: string;
  name: string;
  receivedQtyKg: number;
  availableStockKg: number;
}

export interface Alert {
  id: string;
  type: "delay" | "downtime" | "stock" | "batch";
  severity: "low" | "medium" | "high";
  message: string;
  time: string;
}

export interface KPIData {
  totalLeafCollected: number;
  totalProcessed: number;
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
  };
  trucksInTransit: number;
  deliveredShipments: number;
}

export interface ActivityItem {
  id: string;
  type: "leaf" | "process" | "grading" | "packaging" | "logistics";
  message: string;
  time: string;
}

// Re-using for charts if needed
export interface ChartDataPoint {
  date: string;
  collection: number;
  processed: number;
  dispatched: number;
}
