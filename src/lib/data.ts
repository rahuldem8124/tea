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
  PortalProduct,
  PortalOrder,
} from "@/types";

export const leafEntries: LeafEntry[] = [
  { id: "L001", farmerName: "Suresh Kumar", date: new Date().toISOString().split("T")[0], collectionTime: "08:00 AM", batchId: "BT-1001", quantityKg: 320, qualityGrade: "A+", moistureContent: 68, finePluckingPercentage: 82, pricePerKg: 85, paymentStatus: "paid", status: "Processed" },
  { id: "L002", farmerName: "Rajan Nair", date: new Date().toISOString().split("T")[0], collectionTime: "09:30 AM", batchId: "BT-1002", quantityKg: 280, qualityGrade: "A", moistureContent: 72, finePluckingPercentage: 75, pricePerKg: 75, paymentStatus: "pending", status: "Pending" },
  { id: "L003", farmerName: "Murugan S.", date: new Date().toISOString().split("T")[0], collectionTime: "10:00 AM", batchId: "BT-1003", quantityKg: 410, qualityGrade: "B", moistureContent: 75, finePluckingPercentage: 60, pricePerKg: 60, paymentStatus: "pending", status: "In Processing" },
  { id: "L004", farmerName: "Lakshmi Devi", date: new Date().toISOString().split("T")[0], collectionTime: "11:15 AM", batchId: "BT-1004", quantityKg: 195, qualityGrade: "A+", moistureContent: 69, finePluckingPercentage: 80, pricePerKg: 85, paymentStatus: "paid", status: "Collected" },
  { id: "L005", farmerName: "Anil Verma", date: new Date().toISOString().split("T")[0], collectionTime: "12:00 PM", batchId: "BT-1005", quantityKg: 240, qualityGrade: "B", moistureContent: 73, finePluckingPercentage: 65, pricePerKg: 60, paymentStatus: "paid", status: "Collected" },
];

export const machines: Machine[] = [
  { id: "M001", name: "Trough Line A", type: "Withering Trough", status: "Active", stage: "Withering", loadPercentage: 85, lastMaintenanceDate: "2026-02-15", nextMaintenanceDue: "2026-04-15", isRental: false },
  { id: "M002", name: "Rotorvane 1", type: "CTC Roller", status: "Active", stage: "Rolling", currentBatchId: "BT-1001", loadPercentage: 92, lastMaintenanceDate: "2026-03-01", nextMaintenanceDue: "2026-05-01", isRental: false },
  { id: "M004", name: "Fluid Bed Dryer", type: "FBD Dryer", status: "Active", stage: "Drying", temperature: 110, lastMaintenanceDate: "2026-03-10", nextMaintenanceDue: "2026-05-10", isRental: false },
];

export const processingBatches: ProcessingBatch[] = [
  { 
    id: "BT-1001", 
    machineId: "M002", 
    inputQtyKg: 245, 
    startTime: "11:00 AM", 
    status: "processing",
    supplier: "Kumara Perera",
    collectedAt: "08:30 AM",
    duration: "1h 45m so far"
  },
  { 
    id: "BT-1000", 
    machineId: "M004", 
    inputQtyKg: 300, 
    startTime: "09:00 AM", 
    endTime: "10:30 AM", 
    outputQtyKg: 292, 
    status: "completed", 
    wastagePercentage: 2.6,
    supplier: "Nimal Silva",
    collectedAt: "07:15 AM",
    gradingDistribution: { A: 150, B: 100, C: 42 },
    packagingInfo: { packageType: "Bags", count: 6 },
    duration: "1h 30m"
  },
];

export const gradingRecords: GradingRecord[] = [
  { id: "GR-999", batchId: "BT-1000", grades: { gradeA: 150, gradeB: 100, gradeC: 42, waste: 8 }, date: "2026-03-23" },
];

export const packagingRecords: PackagingRecord[] = [
  { id: "PK-999", batchId: "BT-1000", packageType: "Bags", weightPerPackage: 50, totalPackages: 6, status: "completed" },
];

export const truckDispatches: TruckDispatch[] = [
  { id: "TR-501", truckId: "LP-8842", driverName: "Manoj R.", destinationGodown: "Colombo", loadDetails: [], departureTime: "08:00 AM", estimatedArrivalTime: "+45 mins", status: "delayed" },
  { id: "TR-502", truckId: "LP-9012", driverName: "Sunil K.", destinationGodown: "Kochi", loadDetails: [], departureTime: "09:00 AM", estimatedArrivalTime: "On time", status: "in_transit" },
  { id: "TR-503", truckId: "LP-7731", driverName: "Pradeep M.", destinationGodown: "Chennai", loadDetails: [], departureTime: "10:00 AM", estimatedArrivalTime: "On time", status: "in_transit" },
  { id: "TR-504", truckId: "LP-6623", driverName: "Vikram S.", destinationGodown: "Munnar", loadDetails: [], departureTime: "07:00 AM", estimatedArrivalTime: "—", status: "delivered" },
  { id: "TR-505", truckId: "LP-5510", driverName: "Ravi T.", destinationGodown: "Coimbatore", loadDetails: [], departureTime: "12:00 PM", estimatedArrivalTime: "3:00 PM", status: "dispatched" },
];

export const godowns: Godown[] = [
  { 
    id: "GD-01", 
    name: "Colombo Warehouse A", 
    receivedQtyKg: 4500, 
    availableStockKg: 1200,
    stockPerGrade: { A: 500, B: 400, C: 300 },
    recentArrivals: [
      { batchId: "BT-1000", quantity: 150, receivedTime: "04:30 PM" }
    ],
    lastUpdated: "15 mins ago"
  },
  { 
    id: "GD-02", 
    name: "Galle Hub", 
    receivedQtyKg: 2100, 
    availableStockKg: 850,
    stockPerGrade: { A: 300, B: 300, C: 250 },
    recentArrivals: [],
    lastUpdated: "45 mins ago"
  },
  { 
    id: "GD-03", 
    name: "Kandy Distribution", 
    receivedQtyKg: 1800, 
    availableStockKg: 1500,
    stockPerGrade: { A: 700, B: 500, C: 300 },
    recentArrivals: [],
    lastUpdated: "10 mins ago"
  },
];

export const alerts: Alert[] = [
  { id: "AL-02", type: "downtime", severity: "high", message: "Rotorvane 1 motor overheating (94°C)", time: "1 hr ago" },
  { id: "AL-01", type: "delay", severity: "medium", message: "Truck LP-8842 delayed by 45 mins due to traffic", time: "10 min ago" },
  { id: "AL-03", type: "stock", severity: "low", message: "Godown GD-02 (Galle) available stock below 1000kg", time: "2 hr ago" },
  { id: "AL-04", type: "batch", severity: "low", message: "Batch BT-1002 pending processing for 4 hours", time: "30 min ago" },
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
  delayedTrucks: 3,
  deliveredShipments: 145,
};

export const dailyChartData: ChartDataPoint[] = [
  { date: "Mon", collection: 1100, processed: 870, dispatched: 0 },
  { date: "Tue", collection: 980, processed: 760, dispatched: 0 },
  { date: "Wed", collection: 1340, processed: 1050, dispatched: 0 },
  { date: "Thu", collection: 1200, processed: 940, dispatched: 0 },
  { date: "Fri", collection: 1450, processed: 1120, dispatched: 0 },
  { date: "Sat", collection: 890, processed: 700, dispatched: 0 },
  { date: "Sun", collection: 760, processed: 600, dispatched: 0 },
];

export const revenueChartData = [
  { week: "Week 1", revenue: 1.2 },
  { week: "Week 2", revenue: 1.5 },
  { week: "Week 3", revenue: 1.1 },
  { week: "Week 4", revenue: 1.8 },
];

export const portalProducts: PortalProduct[] = [
  { id: "P001", name: "Premium Broken Orange Pekoe", grade: "BOP", description: "Fine grade tea with a robust flavor and rich aroma.", pricePerKg: 850, image: "https://images.unsplash.com/photo-1544784703-352d03ad53bc?w=800", stockStatus: "in-stock" },
  { id: "P002", name: "Flowery Broken Orange Pekoe", grade: "FBOP", description: "Longer leaves with a delicate, flowery fragrance.", pricePerKg: 1100, image: "https://images.unsplash.com/photo-1594631252845-59fc59739e83?w=800", stockStatus: "in-stock" },
  { id: "P003", name: "Silver Tips Special", grade: "PEKOE", description: "Exotic hand-picked buds with a subtle silvery sheen.", pricePerKg: 2500, image: "https://images.unsplash.com/photo-1563911191470-85110056506a?w=800", stockStatus: "low-stock" },
];

export const portalOrders: PortalOrder[] = [
  { id: "ORD-9901", date: "2026-03-24", total: 4250, status: "processing", items: [{ productId: "P001", productName: "BOP", quantity: 5, price: 850 }] },
];
