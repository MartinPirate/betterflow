import { toast } from "@/hooks/use-toast";

export const showToast = {
  success: (message: string, description?: string) => {
    toast({
      title: message,
      description,
      className: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100",
    });
  },

  error: (message: string, description?: string) => {
    toast({
      title: message,
      description,
      variant: "destructive",
    });
  },

  warning: (message: string, description?: string) => {
    toast({
      title: message,
      description,
      className: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100",
    });
  },

  info: (message: string, description?: string) => {
    toast({
      title: message,
      description,
      className: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    {
      loading = "Loading...",
      success = "Success!",
      error = "Something went wrong",
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: Error) => string);
    } = {}
  ) => {
    toast({
      title: loading,
      className: "bg-gray-50 border-gray-200 text-gray-900 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-100",
    });

    promise
      .then((data) => {
        const successMessage = typeof success === "function" ? success(data) : success;
        showToast.success(successMessage);
      })
      .catch((err) => {
        const errorMessage = typeof error === "function" ? error(err) : error;
        showToast.error(errorMessage);
      });

    return promise;
  },
};