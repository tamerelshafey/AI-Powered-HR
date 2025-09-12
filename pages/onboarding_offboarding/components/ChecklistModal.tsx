

import React, { useState } from 'react';
import { OnboardingProcess, OnboardingTaskStatus, ProcessStatus, ProcessTask } from '../../../types';
import AssetChecklistModal from './AssetChecklistModal';
import { useI18n } from '../../../context/I18nContext';
import { formatDate } from '../../../utils/formatters';

interface ChecklistModalProps {
  process: OnboardingProcess;
  onClose: () => void;
  onTaskStatusChange: (processId: string, taskId: string, newStatus: OnboardingTaskStatus) => void;
  onAddTaskNote: (processId: string, taskId: string, noteText: string) => void;
  onSendReminder: (taskTitle: string, assignee: string) => void;
}

const AddNoteForm: React.FC<{ taskId: string; processId: string; onAddTaskNote: (processId: string, taskId: string, noteText: string) => void }> = ({ taskId, processId, onAddTaskNote }) => {
    const [note, setNote] = useState('');
    const { language } = useI18n();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTaskNote(processId, taskId, note);
        setNote('');
    };
    return (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-2 space-x-reverse">
            <input 
                type="text" 
                value={note} 
                onChange={e => setNote(e.target.value)} 
                placeholder="إضافة ملاحظة..." 
                className="flex-grow px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            />
            <button 
                type="submit" 
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                disabled={!note.trim()}
            >
                إضافة
            </button>
        </form>
    );
};

const ChecklistModal: React.FC<ChecklistModalProps> = ({ process, onClose, onTaskStatusChange, onAddTaskNote, onSendReminder }) => {
  const [visibleNotes, setVisibleNotes] = useState<Record<string, boolean>>({});
  const [isAssetModalOpen, setAssetModalOpen] = useState(false);
  const [assetModalConfig, setAssetModalConfig] = useState<{ mode: 'assign' | 'retrieve', task: ProcessTask } | null>(null);
  const { language } = useI18n();

  const handleTaskToggle = (taskId: string, currentStatus: OnboardingTaskStatus) => {
    const newStatus = currentStatus === OnboardingTaskStatus.COMPLETED 
        ? OnboardingTaskStatus.PENDING 
        : OnboardingTaskStatus.COMPLETED;
    onTaskStatusChange(process.id, taskId, newStatus);
  };
  
  const toggleNotesVisibility = (taskId: string) => {
      setVisibleNotes(prev => ({...prev, [taskId]: !prev[taskId]}));
  };

  const handleOpenAssetModal = (task: ProcessTask, mode: 'assign' | 'retrieve') => {
    setAssetModalConfig({ task, mode });
    setAssetModalOpen(true);
  };

  const handleConfirmAssetAction = () => {
    if (assetModalConfig) {
      onTaskStatusChange(process.id, assetModalConfig.task.id, OnboardingTaskStatus.COMPLETED);
    }
    setAssetModalOpen(false);
    setAssetModalConfig(null);
  };

  const isProcessCompleted = process.status === ProcessStatus.COMPLETED;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                   <h3 className="text-lg font-semibold text-gray-900">قائمة مهام {process.type}</h3>
                   <p className="text-sm text-gray-600">لـ: {process.employee.firstName} {process.employee.lastName}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
             <div className="mt-4">
                  <div className="flex items-center">
                      <span className="text-sm text-gray-600 me-3 w-10">{process.progress}%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${isProcessCompleted ? 'bg-green-600' : 'bg-blue-600'} h-2 rounded-full transition-all duration-300`} style={{ width: `${process.progress}%` }}></div>
                      </div>
                  </div>
              </div>
               {isProcessCompleted && (
                  <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-lg text-sm flex items-center">
                      <i className="fas fa-check-circle me-2"></i>
                      <span>تم إكمال هذه العملية بنجاح. لإعادة فتحها، قم بإلغاء تحديد إحدى المهام.</span>
                  </div>
              )}
          </div>

          <div className="p-6 overflow-y-auto">
              <div className="space-y-3">
                  {process.tasks.map(task => {
                    const isAssetAssignTask = task.type === 'ASSIGN_ASSETS';
                    const isAssetRetrieveTask = task.type === 'RETRIEVE_ASSETS';
                    const isInteractiveTask = isAssetAssignTask || isAssetRetrieveTask;

                    return (
                      <div key={task.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center">
                              {!isInteractiveTask && (
                                <input 
                                    type="checkbox" 
                                    checked={task.status === OnboardingTaskStatus.COMPLETED} 
                                    onChange={() => handleTaskToggle(task.id, task.status)}
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 me-3 cursor-pointer"
                                />
                              )}
                              <div className="flex-1">
                                  <p className={`text-sm font-medium transition-colors ${task.status === OnboardingTaskStatus.COMPLETED ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                      {task.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                      المستحق: {task.dueDate} • المكلف: {task.assignee}
                                  </p>
                              </div>
                              {isInteractiveTask ? (
                                <button
                                    onClick={() => handleOpenAssetModal(task, isAssetAssignTask ? 'assign' : 'retrieve')}
                                    disabled={task.status === OnboardingTaskStatus.COMPLETED}
                                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${isAssetAssignTask ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}>
                                    {isAssetAssignTask ? 'تسليم الأصول' : 'استلام الأصول'}
                                </button>
                               ) : (
                                <span className={`text-xs px-2 py-1 rounded-full transition-colors me-2 ${task.status === OnboardingTaskStatus.COMPLETED ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                  {task.status}
                                </span>
                              )}
                               <button onClick={() => toggleNotesVisibility(task.id)} className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-200" title="الملاحظات">
                                  <i className="fas fa-comment-dots"></i>
                                  {task.notes && task.notes.length > 0 && <span className="ms-1 text-xs font-bold text-blue-600">{task.notes.length}</span>}
                              </button>
                               <button 
                                  onClick={() => onSendReminder(task.title, task.assignee)} 
                                  className="p-2 text-gray-500 hover:text-orange-600 rounded-full hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed" 
                                  title="إرسال تذكير"
                                  disabled={task.status === OnboardingTaskStatus.COMPLETED}
                              >
                                  <i className="fas fa-bell"></i>
                              </button>
                          </div>
                          {visibleNotes[task.id] && (
                               <div className="mt-2 pt-2 border-t border-gray-200">
                                  <div className="space-y-2 max-h-32 overflow-y-auto p-1">
                                      {task.notes && task.notes.length > 0 ? (
                                          task.notes.map((note, index) => (
                                              <div key={index} className="text-xs bg-white p-2 rounded-md border">
                                                  <p className="text-gray-800">{note.text}</p>
                                                  <p className="text-gray-500 text-end mt-1">- {note.author}, {formatDate(note.date, language)}</p>
                                              </div>
                                          ))
                                      ) : (
                                          <p className="text-xs text-gray-500 text-center py-2">لا توجد ملاحظات لهذه المهمة.</p>
                                      )}
                                  </div>
                                  <AddNoteForm taskId={task.id} processId={process.id} onAddTaskNote={onAddTaskNote} />
                              </div>
                          )}
                      </div>
                    )
                  })}
              </div>
          </div>

          <div className="p-6 border-t border-gray-200 mt-auto bg-gray-50">
              <div className="flex justify-end space-x-3 space-x-reverse">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                      إغلاق
                  </button>
              </div>
          </div>
        </div>
      </div>
      {isAssetModalOpen && assetModalConfig && (
          <AssetChecklistModal
            isOpen={isAssetModalOpen}
            onClose={() => setAssetModalOpen(false)}
            onConfirm={handleConfirmAssetAction}
            mode={assetModalConfig.mode}
            employee={process.employee}
          />
      )}
    </>
  );
};

export default ChecklistModal;