import { SuccessionPlan, SuccessorReadiness } from '../../types';
import { employees } from '../employees/data';
import { jobTitles } from '../job_titles/data';

// Use employee IDs which are stable and exist in the mock data
const cto = employees.find(e => e.id === 'EMP001'); // John Doe is a Senior Software Engineer, we'll make him CTO for this plan.
const ctoJobTitle = jobTitles.find(jt => jt.id === 'jt_cto');

const cmo = employees.find(e => e.id === 'EMP002'); // Jane Smith is Marketing Manager
const cmoJobTitle = jobTitles.find(jt => jt.id === 'jt_cmo');

const hrManager = employees.find(e => e.id === 'EMP004'); // Sarah Johnson is HR Manager
const hrManagerJobTitle = jobTitles.find(jt => jt.id === 'jt_hr_manager_main');

const engManagerJobTitle = jobTitles.find(jt => jt.id === 'jt_eng_manager');
const engManager = employees.find(e => e.id === 'EMP011'); // David Lee as placeholder Engineering Manager


export const successionPlans: SuccessionPlan[] = [
    {
        jobTitle: ctoJobTitle!,
        incumbent: cto!,
        successors: [
            {
                employee: employees.find(e => e.id === 'EMP011')!, // David Lee
                readiness: SuccessorReadiness.READY_NOW,
                performance: 'High',
                potential: 'High'
            },
            {
                employee: employees.find(e => e.id === 'EMP013')!, // Chris Green
                readiness: SuccessorReadiness.READY_1_2_YEARS,
                performance: 'High',
                potential: 'Medium'
            }
        ]
    },
    {
        jobTitle: cmoJobTitle!,
        incumbent: cmo!,
        successors: [
             {
                employee: employees.find(e => e.id === 'EMP008')!, // Sameer Saleh
                readiness: SuccessorReadiness.READY_1_2_YEARS,
                performance: 'High',
                potential: 'High'
            },
             {
                employee: employees.find(e => e.id === 'EMP014')!, // Maria Garcia
                readiness: SuccessorReadiness.FUTURE_POTENTIAL,
                performance: 'Medium',
                potential: 'High'
            }
        ]
    },
    {
        jobTitle: hrManagerJobTitle!,
        incumbent: hrManager!,
        successors: [
             {
                employee: employees.find(e => e.id === 'EMP018')!, // Jessica Rodriguez
                readiness: SuccessorReadiness.READY_1_2_YEARS,
                performance: 'High',
                potential: 'Medium'
            }
        ]
    },
    {
        jobTitle: engManagerJobTitle!,
        incumbent: engManager!,
        successors: []
    }
];
