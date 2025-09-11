import { CompanyAsset, AssetCategory, AssetStatus } from '../../types';
import { employees } from '../employees/data';

export const companyAssets: CompanyAsset[] = [
    {
        id: 'ASSET001',
        name: 'MacBook Pro 16"',
        category: AssetCategory.LAPTOP,
        serialNumber: 'C02F1234J1G5',
        purchaseDate: '2023-01-10',
        status: AssetStatus.IN_USE,
        assignedTo: employees[0], // John Doe
        assignmentDate: '2023-01-15',
    },
    {
        id: 'ASSET002',
        name: 'iPhone 15 Pro',
        category: AssetCategory.PHONE,
        serialNumber: 'VM9P1234N7XQ',
        purchaseDate: '2023-09-20',
        status: AssetStatus.IN_USE,
        assignedTo: employees[1], // Jane Smith
        assignmentDate: '2023-09-25',
    },
    {
        id: 'ASSET003',
        name: 'Dell Latitude 7420',
        category: AssetCategory.LAPTOP,
        serialNumber: 'DL7420-54321',
        purchaseDate: '2022-11-05',
        status: AssetStatus.AVAILABLE,
    },
    {
        id: 'ASSET004',
        name: 'Toyota Camry 2023',
        category: AssetCategory.VEHICLE,
        serialNumber: 'TC2023-98765',
        purchaseDate: '2023-02-20',
        status: AssetStatus.IN_USE,
        assignedTo: employees[2], // Mike Wilson
        assignmentDate: '2023-03-01',
    },
    {
        id: 'ASSET005',
        name: 'Herman Miller Aeron',
        category: AssetCategory.FURNITURE,
        serialNumber: 'HM-Aeron-11223',
        purchaseDate: '2021-05-15',
        status: AssetStatus.IN_REPAIR,
    },
    {
        id: 'ASSET006',
        name: 'MacBook Pro 14"',
        category: AssetCategory.LAPTOP,
        serialNumber: 'C02G1234K2H6',
        purchaseDate: '2023-05-18',
        status: AssetStatus.AVAILABLE,
    },
    {
        id: 'ASSET007',
        name: 'Samsung Galaxy S23',
        category: AssetCategory.PHONE,
        serialNumber: 'SG23-67890',
        purchaseDate: '2023-03-12',
        status: AssetStatus.RETIRED,
    },
];
