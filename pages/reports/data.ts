

import { Kpi, Performer, Report, PredictiveInsight } from '../../types';
import { employees } from '../employees/data';

export const kpis: Kpi[] = [
    {
        label: "رضا الموظفين",
        value: "87.5%",
        change: "+2.3% عن الشهر الماضي",
        icon: "fas fa-smile",
        progress: 87.5,
        color: 'green'
    },
    {
        label: "معدل الدوران",
        value: "3.2%",
        change: "-0.8% عن الشهر الماضي",
        icon: "fas fa-user-minus",
        progress: 32, // progress is percentage * 10 for better visualization
        color: 'red'
    },
    {
        label: "مؤشر الإنتاجية",
        value: "94.7",
        change: "+5.2 عن الشهر الماضي",
        icon: "fas fa-chart-line",
        progress: 94.7,
        color: 'blue'
    },
    {
        label: "إكمال التدريب",
        value: "78.3%",
        change: "+12.1% عن الشهر الماضي",
        icon: "fas fa-graduation-cap",
        progress: 78.3,
        color: 'purple'
    }
];

export const topPerformers: Performer[] = [
    { employee: employees[4], score: 98.5, trend: 2.3 },
    { employee: employees[1], score: 96.8, trend: 1.7 },
    { employee: employees[2], score: 95.2, trend: 0.0 },
];

export const recentReportsData: Report[] = [
    { id: 'rep01', name: "تقرير الحضور الشهري", icon: "fas fa-chart-bar", iconColor: "blue", generated: "منذ ساعتين", size: "247 KB" },
    { id: 'rep02', name: "استبيان رضا الموظفين", icon: "fas fa-users", iconColor: "green", generated: "أمس", size: "1.2 MB" },
    { id: 'rep03', name: "مراجعة الأداء الربع سنوية", icon: "fas fa-chart-pie", iconColor: "purple", generated: "منذ 3 أيام", size: "3.4 MB" },
    { id: 'rep04', name: "تحليل الإجازات", icon: "fas fa-calendar-alt", iconColor: "orange", generated: "منذ أسبوع", size: "892 KB" },
];

export const predictiveInsightsData: PredictiveInsight[] = [
  {
    title: "توافق التقارير مع القانون الجديد",
    badge: "مُحدَّث",
    badgeColor: 'green',
    value: "متوافق 100%",
    description: "تم تحديث جميع حسابات التقارير، بما في ذلك تحليلات الحضور والإجازات، لتعكس بدقة متطلبات قانون العمل الجديد.",
    icon: "fas fa-check-circle",
    details: "تأثير على تقارير الرواتب والإجازات",
    gradient: "from-green-50 to-emerald-100"
  },
  {
    title: "تنبيه بمخاطر الاحتفاظ بالموظفين",
    badge: "مخاطرة عالية",
    badgeColor: 'red',
    value: "15% قسم المبيعات",
    description: "يتوقع نموذجنا خطر استنزاف بنسبة 15% في قسم المبيعات خلال الربع القادم. نوصي بمراجعة أعباء العمل والتعويضات.",
    icon: "fas fa-user-minus",
    details: "الربع القادم",
    gradient: "from-red-50 to-rose-100"
  },
  {
    title: "توقع ارتفاع العمل الإضافي",
    badge: "تخطيط استباقي",
    badgeColor: 'blue',
    value: "+30% قسم الهندسة",
    description: "من المتوقع ارتفاع العمل الإضافي بنسبة 30% في قسم الهندسة الشهر المقبل بسبب إطلاق المشروع. خطط للموارد وفقًا لذلك.",
    icon: "fas fa-clock",
    details: "الشهر القادم",
    gradient: "from-blue-50 to-indigo-100"
  }
];
