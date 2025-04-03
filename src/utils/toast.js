
import { toast as sonnerToast } from 'sonner';

// Create a simple toast utility that wraps the sonner toast functions
const toast = {
  // Basic toast function
  message: (message, options = {}) => sonnerToast(message, options),
  
  // Status toasts
  success: (message, options = {}) => sonnerToast.success(message, options),
  error: (message, options = {}) => sonnerToast.error(message, options),
  warning: (message, options = {}) => sonnerToast.warning(message, options),
  info: (message, options = {}) => sonnerToast.info(message, options),
  
  // Dismiss all toasts
  dismiss: () => sonnerToast.dismiss(),
  
  // Promise toast
  promise: (promise, messages, options = {}) => 
    sonnerToast.promise(promise, messages, options),
};

export default toast;
