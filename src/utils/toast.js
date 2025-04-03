
import { toast as sonnerToast } from 'sonner';

// Create a toast utility function that wraps sonner
const toast = (options) => {
  // Map the options from shadcn/ui toast to sonner toast
  const { title, description, variant = "default", ...rest } = options;
  
  // Handle different variants
  switch (variant) {
    case "destructive":
      return sonnerToast.error(title, {
        description,
        ...rest
      });
    case "success":
      return sonnerToast.success(title, {
        description,
        ...rest
      });
    case "warning":
      return sonnerToast.warning(title, {
        description,
        ...rest
      });
    case "info":
    case "default":
    default:
      return sonnerToast(title, {
        description,
        ...rest
      });
  }
};

// Add a dismiss method for backward compatibility
toast.dismiss = sonnerToast.dismiss;

export default toast;
