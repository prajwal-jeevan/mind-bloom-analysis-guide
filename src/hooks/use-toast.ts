
// Import our simplified toast utility
import toast from '../utils/toast';

// Create a simple hook that just returns our toast utility
export function useToast() {
  return {
    toast,
    toasts: [],
    dismiss: toast.dismiss
  };
}

// Also export the toast utility directly
export { toast };
