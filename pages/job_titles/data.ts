import { JobTitle } from '../../types';

export const jobTitles: JobTitle[] = [
  // Top Level
  { id: 'jt_ceo', name: 'الرئيس التنفيذي (CEO)', description: 'يقود الرؤية والاستراتيجية العامة للشركة.', department: 'الإدارة العليا', parentJobTitleId: null, employeeCount: 1 },
  
  // Level 1
  { id: 'jt_cto', name: 'مدير التقنية (CTO)', description: 'مسؤول عن جميع الجوانب التقنية للمنتجات والخدمات.', department: 'الإدارة العليا', parentJobTitleId: 'jt_ceo', employeeCount: 1 },
  { id: 'jt_cmo', name: 'رئيس قسم التسويق (CMO)', description: 'يدير جميع أنشطة التسويق والعلامة التجارية.', department: 'الإدارة العليا', parentJobTitleId: 'jt_ceo', employeeCount: 1 },
  { id: 'jt_hr_manager_main', name: 'مدير الموارد البشرية', description: 'يشرف على جميع وظائف الموارد البشرية.', department: 'الموارد البشرية', parentJobTitleId: 'jt_ceo', employeeCount: 1 },

  // Level 2 - Engineering
  { id: 'jt_eng_manager', name: 'مدير الهندسة', description: 'يقود فرق تطوير البرمجيات.', department: 'قسم الهندسة', parentJobTitleId: 'jt_cto', employeeCount: 1 },
  { id: 'jt_qa_manager', name: 'مدير ضمان الجودة', description: 'يضمن جودة المنتجات من خلال الاختبار.', department: 'قسم الهندسة', parentJobTitleId: 'jt_cto', employeeCount: 1 },

  // Level 2 - Marketing
  { id: 'jt_marketing_manager', name: 'مدير التسويق', description: 'ينفذ استراتيجيات التسويق.', department: 'قسم التسويق', parentJobTitleId: 'jt_cmo', employeeCount: 1 },

  // Level 3 - Engineering
  { id: 'jt_senior_fe', name: 'مهندس واجهة أمامية أول', description: 'يطور واجهات المستخدم.', department: 'قسم الهندسة', parentJobTitleId: 'jt_eng_manager', employeeCount: 5 },
  { id: 'jt_senior_be', name: 'مهندس خلفية أول', description: 'يطور المنطق من جانب الخادم.', department: 'قسم الهندسة', parentJobTitleId: 'jt_eng_manager', employeeCount: 4 },
  { id: 'jt_qa_specialist', name: 'أخصائي ضمان الجودة', description: 'يختبر البرامج بحثًا عن الأخطاء.', department: 'قسم الهندسة', parentJobTitleId: 'jt_qa_manager', employeeCount: 3 },
  
  // Level 3 - Marketing
  { id: 'jt_seo_specialist', name: 'أخصائي تحسين محركات البحث', description: 'يحسن ظهور الموقع على محركات البحث.', department: 'قسم التسويق', parentJobTitleId: 'jt_marketing_manager', employeeCount: 2 },
];
