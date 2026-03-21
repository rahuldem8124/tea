import {
  LeafEntry,
  Machine,
  Employee,
  Sale,
  ActivityItem,
  ChartDataPoint,
  BuyerData,
} from "@/types";

export const leafEntries: LeafEntry[] = [
  { id: "L001", farmerName: "Kumara Perera", date: "2026-03-20", quantityKg: 245, qualityGrade: "A+", pricePerKg: 85, totalCost: 20825 },
  { id: "L002", farmerName: "Nimal Silva", date: "2026-03-20", quantityKg: 180, qualityGrade: "A", pricePerKg: 75, totalCost: 13500 },
  { id: "L003", farmerName: "Saman Fernando", date: "2026-03-20", quantityKg: 320, qualityGrade: "B", pricePerKg: 60, totalCost: 19200 },
  { id: "L004", farmerName: "Anura Bandara", date: "2026-03-19", quantityKg: 150, qualityGrade: "A+", pricePerKg: 85, totalCost: 12750 },
  { id: "L005", farmerName: "Priya Jayawardena", date: "2026-03-19", quantityKg: 275, qualityGrade: "A", pricePerKg: 75, totalCost: 20625 },
  { id: "L006", farmerName: "Ranjith Dissanayake", date: "2026-03-18", quantityKg: 195, qualityGrade: "C", pricePerKg: 45, totalCost: 8775 },
  { id: "L007", farmerName: "Sumalee Wickrama", date: "2026-03-18", quantityKg: 410, qualityGrade: "A+", pricePerKg: 85, totalCost: 34850 },
  { id: "L008", farmerName: "Dinesh Ratnayake", date: "2026-03-17", quantityKg: 230, qualityGrade: "B", pricePerKg: 60, totalCost: 13800 },
  { id: "L009", farmerName: "Lakshmi Gunasekara", date: "2026-03-17", quantityKg: 165, qualityGrade: "A", pricePerKg: 75, totalCost: 12375 },
  { id: "L010", farmerName: "Chaminda Liyanage", date: "2026-03-16", quantityKg: 300, qualityGrade: "A+", pricePerKg: 85, totalCost: 25500 },
  { id: "L011", farmerName: "Ravi Senanayake", date: "2026-03-16", quantityKg: 210, qualityGrade: "B", pricePerKg: 60, totalCost: 12600 },
  { id: "L012", farmerName: "Mala Wijesinghe", date: "2026-03-15", quantityKg: 190, qualityGrade: "A", pricePerKg: 75, totalCost: 14250 },
];

export const machines: Machine[] = [
  { id: "M001", name: "Withering Unit A", type: "Withering", status: "Active", lastMaintenanceDate: "2026-02-15", nextMaintenanceDue: "2026-04-15", isRental: false },
  { id: "M002", name: "Rolling Machine 1", type: "Rolling", status: "Active", lastMaintenanceDate: "2026-03-01", nextMaintenanceDue: "2026-05-01", isRental: false },
  { id: "M003", name: "Fermenting Tank B", type: "Fermentation", status: "Maintenance", lastMaintenanceDate: "2026-01-20", nextMaintenanceDue: "2026-03-20", isRental: false },
  { id: "M004", name: "Drying Drum 1", type: "Drying", status: "Active", lastMaintenanceDate: "2026-03-10", nextMaintenanceDue: "2026-05-10", isRental: false },
  { id: "M005", name: "Sorting Conveyor", type: "Sorting", status: "Broken", lastMaintenanceDate: "2026-02-01", nextMaintenanceDue: "2026-04-01", isRental: true },
  { id: "M006", name: "Packaging Line A", type: "Packaging", status: "Active", lastMaintenanceDate: "2026-03-05", nextMaintenanceDue: "2026-05-05", isRental: false },
  { id: "M007", name: "Grading Machine", type: "Grading", status: "Active", lastMaintenanceDate: "2026-02-28", nextMaintenanceDue: "2026-04-28", isRental: true },
  { id: "M008", name: "CTC Machine 1", type: "CTC Processing", status: "Maintenance", lastMaintenanceDate: "2026-01-15", nextMaintenanceDue: "2026-03-15", isRental: false },
];

export const employees: Employee[] = [
  { id: "E001", name: "Roshan Kumara", role: "Manager", shift: "Morning", attendance: true, salary: 85000, joinDate: "2020-01-15" },
  { id: "E002", name: "Samanthi Perera", role: "Supervisor", shift: "Morning", attendance: true, salary: 55000, joinDate: "2021-03-10" },
  { id: "E003", name: "Ajith Fernando", role: "Operator", shift: "Morning", attendance: true, salary: 38000, joinDate: "2022-06-01" },
  { id: "E004", name: "Deepa Silva", role: "Picker", shift: "Afternoon", attendance: false, salary: 25000, joinDate: "2023-01-20" },
  { id: "E005", name: "Nuwan Bandara", role: "Picker", shift: "Morning", attendance: true, salary: 25000, joinDate: "2023-02-15" },
  { id: "E006", name: "Kamala Weerasinghe", role: "Sorter", shift: "Afternoon", attendance: true, salary: 28000, joinDate: "2022-11-01" },
  { id: "E007", name: "Prasad Jayasena", role: "Driver", shift: "Morning", attendance: false, salary: 32000, joinDate: "2021-08-20" },
  { id: "E008", name: "Nilmini Rajapaksha", role: "Sorter", shift: "Night", attendance: true, salary: 30000, joinDate: "2023-04-10" },
  { id: "E009", name: "Harsha Madusanka", role: "Operator", shift: "Night", attendance: true, salary: 38000, joinDate: "2022-09-05" },
  { id: "E010", name: "Tharaka Rathnayake", role: "Picker", shift: "Afternoon", attendance: true, salary: 25000, joinDate: "2024-01-08" },
];

export const sales: Sale[] = [
  { id: "S001", buyerName: "Dilmah Tea Co.", date: "2026-03-20", quantityKg: 500, pricePerKg: 350, totalRevenue: 175000 },
  { id: "S002", buyerName: "Ceylon Exports Ltd.", date: "2026-03-19", quantityKg: 800, pricePerKg: 320, totalRevenue: 256000 },
  { id: "S003", buyerName: "Lanka Tea Hub", date: "2026-03-18", quantityKg: 350, pricePerKg: 280, totalRevenue: 98000 },
  { id: "S004", buyerName: "Sunrise Supermart", date: "2026-03-17", quantityKg: 200, pricePerKg: 420, totalRevenue: 84000 },
  { id: "S005", buyerName: "Dilmah Tea Co.", date: "2026-03-15", quantityKg: 650, pricePerKg: 350, totalRevenue: 227500 },
  { id: "S006", buyerName: "Global Tea Traders", date: "2026-03-14", quantityKg: 1200, pricePerKg: 295, totalRevenue: 354000 },
  { id: "S007", buyerName: "Ceylon Exports Ltd.", date: "2026-03-12", quantityKg: 900, pricePerKg: 320, totalRevenue: 288000 },
  { id: "S008", buyerName: "Mountain Brew Store", date: "2026-03-10", quantityKg: 150, pricePerKg: 450, totalRevenue: 67500 },
  { id: "S009", buyerName: "Lanka Tea Hub", date: "2026-03-08", quantityKg: 420, pricePerKg: 280, totalRevenue: 117600 },
  { id: "S010", buyerName: "Global Tea Traders", date: "2026-03-05", quantityKg: 1000, pricePerKg: 295, totalRevenue: 295000 },
];

export const recentActivity: ActivityItem[] = [
  { id: "A001", type: "leaf", message: "Kumara Perera delivered 245 kg (Grade A+)", time: "2 min ago" },
  { id: "A002", type: "sale", message: "Sale to Dilmah Tea Co. — Rs. 175,000", time: "1 hr ago" },
  { id: "A003", type: "machine", message: "Sorting Conveyor marked as Broken", time: "3 hr ago" },
  { id: "A004", type: "leaf", message: "Nimal Silva delivered 180 kg (Grade A)", time: "4 hr ago" },
  { id: "A005", type: "employee", message: "Deepa Silva marked absent today", time: "5 hr ago" },
  { id: "A006", type: "machine", message: "CTC Machine 1 scheduled for maintenance", time: "6 hr ago" },
  { id: "A007", type: "sale", message: "Sale to Ceylon Exports Ltd. — Rs. 256,000", time: "Yesterday" },
  { id: "A008", type: "leaf", message: "Sumalee Wickrama delivered 410 kg (Grade A+)", time: "Yesterday" },
];

export const dailyChartData: ChartDataPoint[] = [
  { date: "Mar 14", collection: 980, sales: 720, profit: 180 },
  { date: "Mar 15", collection: 1150, sales: 950, profit: 240 },
  { date: "Mar 16", collection: 870, sales: 680, profit: 150 },
  { date: "Mar 17", collection: 1320, sales: 1100, profit: 310 },
  { date: "Mar 18", collection: 1050, sales: 880, profit: 220 },
  { date: "Mar 19", collection: 1480, sales: 1250, profit: 380 },
  { date: "Mar 20", collection: 745, sales: 500, profit: 120 },
];

export const buyerChartData: BuyerData[] = [
  { name: "Global Tea Traders", revenue: 649000 },
  { name: "Ceylon Exports Ltd.", revenue: 544000 },
  { name: "Dilmah Tea Co.", revenue: 402500 },
  { name: "Lanka Tea Hub", revenue: 215600 },
  { name: "Sunrise Supermart", revenue: 84000 },
  { name: "Mountain Brew Store", revenue: 67500 },
];

export const kpiData = {
  totalRevenue: 1963100,
  totalExpenses: 1245800,
  profit: 717300,
  totalProduction: 6170,
};
