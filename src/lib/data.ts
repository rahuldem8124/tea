import {
  LeafEntry,
  Machine,
  Employee,
  ProcessingBatch,
  GradingRecord,
  PackagingRecord,
  TruckDispatch,
  Godown,
  Alert,
  KPIData,
  ActivityItem,
  ChartDataPoint,
} from "@/types";

export const leafEntries: LeafEntry[] = [
  { id: "L001", farmerName: "Kumara Perera", date: "2026-03-23", collectionTime: "08:30 AM", batchId: "BT-1001", quantityKg: 245, qualityGrade: "A+", moistureContent: 68, finePluckingPercentage: 82, pricePerKg: 85 },
  { id: "L002", farmerName: "Nimal Silva", date: "2026-03-23", collectionTime: "09:15 AM", batchId: "BT-1002", quantityKg: 180, qualityGrade: "A", moistureContent: 72, finePluckingPercentage: 75, pricePerKg: 75 },
  { id: "L003", farmerName: "Saman Fernando", date: "2026-03-23", collectionTime: "10:00 AM", batchId: "BT-1003", quantityKg: 320, qualityGrade: "B", moistureContent: 75, finePluckingPercentage: 60, pricePerKg: 60 },
];

export const machines: Machine[] = [
  { id: "M001", name: "Trough Line A", type: "Withering Trough", status: "Active", stage: "Withering", loadPercentage: 85, lastMaintenanceDate: "2026-02-15", nextMaintenanceDue: "2026-04-15", isRental: false },
  { id: "M002", name: "Rotorvane 1", type: "CTC Roller", status: "Active", stage: "Rolling", currentBatchId: "BT-1001", loadPercentage: 92, lastMaintenanceDate: "2026-03-01", nextMaintenanceDue: "2026-05-01", isRental: false },
  { id: "M004", name: "Fluid Bed Dryer", type: "FBD Dryer", status: "Active", stage: "Drying", temperature: 110, lastMaintenanceDate: "2026-03-10", nextMaintenanceDue: "2026-05-10", isRental: false },
];

export const processingBatches: ProcessingBatch[] = [
  { id: "BT-1001", machineId: "M002", inputQtyKg: 245, startTime: "11:00 AM", status: "processing" },
  { id: "BT-1000", machineId: "M004", inputQtyKg: 300, startTime: "09:00 AM", endTime: "10:30 AM", outputQtyKg: 292, status: "completed", wastagePercentage: 2.6 },
];

export const gradingRecords: GradingRecord[] = [
  { id: "GR-999", batchId: "BT-1000", grades: { gradeA: 150, gradeB: 100, gradeC: 42 }, date: "2026-03-23" },
];

export const packagingRecords: PackagingRecord[] = [
  { id: "PK-999", batchId: "BT-1000", packageType: "Bags", weightPerPackage: 50, totalPackages: 6 },
];

export const truckDispatches: TruckDispatch[] = [
  { 
    id: "TR-501", 
    truckId: "LP-8842", 
    driverName: "Sunil Shantha", 
    destinationGodown: "Colombo Warehouse A", 
    loadDetails: [{ batchId: "BT-1000", grade: "Grade A", quantity: 150 }], 
    departureTime: "02:00 PM", 
    estimatedArrivalTime: "06:00 PM", 
    status: "in_transit",
    tripHistory: [
      { tripId: "T-101", destination: "Colombo", departureTime: "08:00 AM", arrivalTime: "12:00 PM", status: "on-time" },
      { tripId: "T-098", destination: "Negombo", departureTime: "10:00 AM", arrivalTime: "02:30 PM", status: "delayed" }
    ]
  },
  { 
    id: "TR-502", 
    truckId: "LP-9910", 
    driverName: "Rajiva Silva", 
    destinationGodown: "Kandy Distribution", 
    loadDetails: [{ batchId: "BT-1001", grade: "Grade A", quantity: 300 }], 
    departureTime: "09:00 AM", 
    estimatedArrivalTime: "11:30 AM", 
    status: "delayed",
    tripHistory: []
  },
  { 
    id: "TR-500", 
    truckId: "LP-1290", 
    driverName: "Nuwan Kumara", 
    destinationGodown: "Galle Hub", 
    loadDetails: [{ batchId: "BT-999", grade: "Grade B", quantity: 200 }], 
    departureTime: "08:00 AM", 
    estimatedArrivalTime: "11:00 AM", 
    actualArrivalTime: "10:45 AM",
    status: "delivered",
    tripHistory: [
      { tripId: "T-100", destination: "Galle", departureTime: "08:00 AM", arrivalTime: "11:00 AM", status: "on-time" }
    ]
  },
];

export const godowns: Godown[] = [
  { id: "GD-01", name: "Colombo Warehouse A", receivedQtyKg: 4500, availableStockKg: 1200 },
  { id: "GD-02", name: "Galle Hub", receivedQtyKg: 2100, availableStockKg: 850 },
  { id: "GD-03", name: "Kandy Distribution", receivedQtyKg: 1800, availableStockKg: 1500 },
];

export const alerts: Alert[] = [
  { id: "AL-01", type: "delay", severity: "high", message: "Truck LP-8842 delayed by 45 mins due to traffic", time: "10 min ago" },
  { id: "AL-02", type: "downtime", severity: "medium", message: "Sorting Vibro showing unusual vibration", time: "1 hr ago" },
  { id: "AL-03", type: "stock", severity: "low", message: "Godown GD-02 available stock below 1000kg", time: "2 hr ago" },
];

export const employees: Employee[] = [
  { id: "E001", name: "Roshan Kumara", role: "Manager", shift: "Morning", attendance: true, salary: 85000, joinDate: "2020-01-15" },
  { id: "E002", name: "Samanthi Perera", role: "Supervisor", shift: "Morning", attendance: true, salary: 55000, joinDate: "2021-03-10" },
];

export const recentActivity: ActivityItem[] = [
  { id: "A001", type: "leaf", message: "Batch BT-1003 collected: 320kg", time: "10:00 AM" },
  { id: "A002", type: "process", message: "Batch BT-1001 rolling initiated", time: "11:00 AM" },
  { id: "A003", type: "logistics", message: "Truck LP-8842 dispatched to Colombo", time: "02:00 PM" },
];

export const kpiData: KPIData = {
  totalLeafCollected: 12450,
  totalProcessed: 11800,
  gradeDistribution: { A: 45, B: 35, C: 20 },
  trucksInTransit: 2,
  deliveredShipments: 145,
};

export const dailyChartData: ChartDataPoint[] = [
  { date: "Mar 17", collection: 1320, processed: 1280, dispatched: 1200 },
  { date: "Mar 18", collection: 1050, processed: 1000, dispatched: 950 },
  { date: "Mar 19", collection: 1480, processed: 1400, dispatched: 1350 },
  { date: "Mar 20", collection: 980, processed: 950, dispatched: 900 },
  { date: "Mar 21", collection: 1150, processed: 1100, dispatched: 1050 },
  { date: "Mar 22", collection: 870, processed: 840, dispatched: 800 },
  { date: "Mar 23", collection: 745, processed: 700, dispatched: 650 },
];
