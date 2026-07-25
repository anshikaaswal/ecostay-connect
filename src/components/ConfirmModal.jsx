import Modal from './ui/Modal'
import { Button } from './ui'
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', cancelText = 'Cancel', variant = 'danger' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || 'Confirm Action'}>
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {message || 'Are you sure you want to proceed?'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="md"
            className="flex-1 !bg-red-600 !hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
          <Button variant="secondary" size="md" className="flex-1" onClick={onClose}>
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
export default ConfirmModal