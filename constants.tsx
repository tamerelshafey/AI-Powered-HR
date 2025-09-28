
import React from 'react';
import { NavItem, PortalNavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
    { path: '/dashboard', nameKey: 'nav.dashboard', icon: <i className="fas fa-tachometer-alt w-6 text-center"></i> },
    { path: '/reports', nameKey: 'nav.reports', icon: <i className="fas fa-chart-pie w-6 text-center"></i> },
    { path: '/employees', nameKey: 'nav.employees', icon: <i className="fas fa-users w-6 text-center"></i> },
    { path: '/org-chart', nameKey: 'nav.org_chart', icon: <i className="fas fa-sitemap w-6 text-center"></i> },
    { path: '/departments', nameKey: 'nav.departments', icon: <i className="fas fa-building w-6 text-center"></i> },
    { path: '/branches', nameKey: 'nav.branches', icon: <i className="fas fa-code-branch w-6 text-center"></i> },
    { path: '/attendance', nameKey: 'nav.attendance', icon: <i className="fas fa-clock w-6 text-center"></i> },
    { path: '/leaves', nameKey: 'nav.leaves', icon: <i className="fas fa-calendar-alt w-6 text-center"></i> },
    { path: '/job-titles', nameKey: 'nav.job_titles', icon: <i className="fas fa-sitemap w-6 text-center"></i> },
    { path: '/payroll', nameKey: 'nav.payroll', icon: <i className="fas fa-money-bill-wave w-6 text-center"></i> },
    { path: '/documents', nameKey: 'nav.documents', icon: <i className="fas fa-file-alt w-6 text-center"></i> },
    { path: '/recruitment', nameKey: 'nav.recruitment', icon: <i className="fas fa-user-plus w-6 text-center"></i> },
    { path: '/performance', nameKey: 'nav.performance', icon: <i className="fas fa-chart-line w-6 text-center"></i> },
    { path: '/learning', nameKey: 'nav.learning', icon: <i className="fas fa-graduation-cap w-6 text-center"></i> },
    { path: '/onboarding-offboarding', nameKey: 'nav.onboarding_offboarding', icon: <i className="fas fa-door-open w-6 text-center"></i> },
    { path: '/assets', nameKey: 'nav.assets', icon: <i className="fas fa-laptop-house w-6 text-center"></i> },
    { path: '/missions', nameKey: 'nav.missions', icon: <i className="fas fa-tasks w-6 text-center"></i> },
    { path: '/recognition', nameKey: 'nav.recognition', icon: <i className="fas fa-award w-6 text-center"></i> },
    { path: '/surveys', nameKey: 'nav.surveys', icon: <i className="fas fa-poll w-6 text-center"></i> },
    { path: '/support-tickets', nameKey: 'nav.support_tickets', icon: <i className="fas fa-headset w-6 text-center"></i> },
    { path: '/help-center', nameKey: 'nav.help_center', icon: <i className="fas fa-question-circle w-6 text-center"></i> },
    { path: '/settings', nameKey: 'nav.settings', icon: <i className="fas fa-cogs w-6 text-center"></i> },
];

export const PORTAL_NAV_ITEMS: PortalNavItem[] = [
    { id: 'dashboard', nameKey: 'portalNav.dashboard', icon: 'fas fa-home' },
    { id: 'profile', nameKey: 'portalNav.profile', icon: 'fas fa-user' },
    { id: 'timeoff', nameKey: 'portalNav.timeoff', icon: 'fas fa-calendar-alt', badgeCount: 2, badgeColor: 'bg-orange-500' },
    { id: 'missions', nameKey: 'portalNav.missions', icon: 'fas fa-tasks' },
    { id: 'payroll', nameKey: 'portalNav.payroll', icon: 'fas fa-dollar-sign' },
    { id: 'benefits', nameKey: 'portalNav.benefits', icon: 'fas fa-shield-alt' },
    { id: 'documents', nameKey: 'portalNav.documents', icon: 'fas fa-file-alt' },
    { id: 'learning', nameKey: 'portalNav.learning', icon: 'fas fa-graduation-cap' },
    { id: 'development_plan', nameKey: 'portalNav.development_plan', icon: 'fas fa-rocket', badgeKey: 'portalNav.badge.new', badgeColor: 'bg-purple-500' },
    { id: 'feedback', nameKey: 'portalNav.feedback', icon: 'fas fa-comment' },
];
