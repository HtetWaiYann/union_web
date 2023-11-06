import { toast } from "react-toastify";

export const notify = (msg: string) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    theme: "light",
  });

export const notifySuccess = (msg: string) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    theme: "light",
  });
