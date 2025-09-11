import { EmployeeDocument, DocumentType, DocumentStatus } from '../../types';
import { employees } from '../employees/data';

const thirtyDaysFromNow = new Date();
thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

const tenDaysAgo = new Date();
tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

export const employeeDocuments: EmployeeDocument[] = [
    {
        id: 'DOC001',
        employee: employees[0],
        documentType: DocumentType.PASSPORT,
        documentNumber: 'A12345678',
        issueDate: '2020-01-15',
        expiryDate: '2025-01-14',
        status: DocumentStatus.VALID,
        fileUrl: '#',
    },
    {
        id: 'DOC002',
        employee: employees[1],
        documentType: DocumentType.VISA,
        documentNumber: 'V98765432',
        issueDate: '2023-08-01',
        expiryDate: thirtyDaysFromNow.toISOString().split('T')[0],
        status: DocumentStatus.EXPIRING_SOON,
        fileUrl: '#',
    },
    {
        id: 'DOC003',
        employee: employees[2],
        documentType: DocumentType.CONTRACT,
        documentNumber: 'CON-2022-EMP003',
        issueDate: '2022-06-01',
        expiryDate: null,
        status: DocumentStatus.VALID,
        fileUrl: '#',
    },
    {
        id: 'DOC004',
        employee: employees[3],
        documentType: DocumentType.NATIONAL_ID,
        documentNumber: '29010101234567',
        issueDate: '2015-05-20',
        expiryDate: tenDaysAgo.toISOString().split('T')[0],
        status: DocumentStatus.EXPIRED,
        fileUrl: '#',
    },
    {
        id: 'DOC005',
        employee: employees[4],
        documentType: DocumentType.DRIVING_LICENSE,
        documentNumber: 'DL-54321-EMP005',
        issueDate: '2021-11-10',
        expiryDate: '2026-11-09',
        status: DocumentStatus.VALID,
        fileUrl: '#',
    },
     {
        id: 'DOC006',
        employee: employees[5],
        documentType: DocumentType.PASSPORT,
        documentNumber: 'B87654321',
        issueDate: '2018-03-22',
        expiryDate: '2028-03-21',
        status: DocumentStatus.VALID,
        fileUrl: '#',
    },
    {
        id: 'DOC007',
        employee: employees[4], // Alex Chen
        documentType: DocumentType.CONTRACT_2025,
        documentNumber: 'N/A',
        issueDate: '',
        expiryDate: null,
        status: DocumentStatus.MISSING,
        fileUrl: '#',
    }
];