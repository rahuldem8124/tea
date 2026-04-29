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
  collectionTime?: string;
  batchId?: string;
  quantityKg: number;
  qualityGrade: QualityGrade; // Raw leaf quality
  moistureContent?: number;
  finePluckingPercentage?: number;
  pricePerKg: number;
  totalCost?: number;
  paymentStatus: "pending" | "paid" | "partial";
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  duration?: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: MachineStatus;
  stage?: ProcessStage;
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
  supplier?: string;
  collectedAt?: string;
  gradingDistribution?: {
    A: number;
    B: number;
    C: number;
  };
  packagingInfo?: {
    packageType: string;
    count: number;
  };
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GradingRecord {
  id: string;
  batchId: string;
  grades: {
    gradeA: number;
    gradeB: number;
    gradeC: number;
    waste: number;
  };
  date: string;
}

export interface PackagingRecord {
  id: string;
  batchId: string;
  packageType: "Bags" | "Boxes";
  weightPerPackage: number; // kg
  totalPackages: number;
  status: "pending" | "completed";
}

export type TruckStatus = "loading" | "dispatched" | "in_transit" | "delivered" | "delayed";

export interface TripHistoryItem {
  tripId: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: "on-time" | "delayed";
}

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
  actualArrivalTime?: string;
  status: TruckStatus;
  tripHistory?: TripHistoryItem[];
}

export interface Godown {
  id: string;
  name: string;
  receivedQtyKg: number;
  availableStockKg: number;
  stockPerGrade: {
    A: number;
    B: number;
    C: number;
  };
  recentArrivals: {
    batchId: string;
    quantity: number;
    receivedTime: string;
  }[];
  lastUpdated: string;
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
  delayedTrucks: number;
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

export interface PortalProduct {
  id: string;
  name: string;
  grade: TeaGrade;
  description: string;
  pricePerKg: number;
  image: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
}

export interface PortalOrder {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
}
