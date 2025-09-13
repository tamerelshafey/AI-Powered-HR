
import React from 'react';
import { useI18n } from '../../../context/I18nContext';
import Modal, { ModalHeader, ModalBody } from '../../../components/Modal';

interface OrgChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrgChartModal: React.FC<OrgChartModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <ModalHeader title={t('page.employees.orgChart.title')} onClose={onClose} />
      <ModalBody>
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-lg text-center transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
              <i className="fas fa-crown text-lg"></i>
            </div>
            <h4 className="font-semibold">{t('page.employees.orgChart.ceo')}</h4>
            <p className="text-sm opacity-90">{t('page.employees.orgChart.ceoTitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center transition-transform hover:scale-105">
            <h4 className="font-semibold">{t('page.employees.orgChart.cto')}</h4>
            <p className="text-sm opacity-90">{t('page.employees.orgChart.ctoDept')}</p>
            <p className="text-xs opacity-75 mt-1">{t('page.employees.orgChart.employeesCount', { count: 25 })}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center transition-transform hover:scale-105">
            <h4 className="font-semibold">{t('page.employees.orgChart.cmo')}</h4>
            <p className="text-sm opacity-90">{t('page.employees.orgChart.cmoDept')}</p>
            <p className="text-xs opacity-75 mt-1">{t('page.employees.orgChart.employeesCount', { count: 18 })}</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-lg text-center transition-transform hover:scale-105">
            <h4 className="font-semibold">{t('page.employees.orgChart.salesDirector')}</h4>
            <p className="text-sm opacity-90">{t('page.employees.orgChart.salesDept')}</p>
            <p className="text-xs opacity-75 mt-1">{t('page.employees.orgChart.employeesCount', { count: 32 })}</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg text-center transition-transform hover:scale-105">
            <h4 className="font-semibold">سارة جونسون</h4>
            <p className="text-sm opacity-90">{t('page.employees.orgChart.hrManager')}</p>
            <p className="text-xs opacity-75 mt-1">{t('page.employees.orgChart.employeesCount', { count: 12 })}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">{t('page.employees.orgChart.sampleTeam')}</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg text-center">
              <p className="text-xs font-medium">جون دو</p>
              <p className="text-xs text-gray-500">مهندس برمجيات أقدم</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <p className="text-xs font-medium">أليكس تشين</p>
              <p className="text-xs text-gray-500">مصمم UX</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <p className="text-xs font-medium">إيما ميلر</p>
              <p className="text-xs text-gray-500">مهندس DevOps</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <p className="text-xs font-medium">{t('page.employees.orgChart.otherMembers', { count: 22 })}</p>
              <p className="text-xs text-gray-500">{t('page.employees.orgChart.teamMembers')}</p>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default OrgChartModal;
