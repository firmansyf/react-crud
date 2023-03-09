import { toast } from "react-toastify";

const ToastMessage = (e) => {
  switch (e.type) {
    case "success":
      toast.success(e.message);
      break;
    case "error":
      toast.error(e?.message);
      break;
    default:
      toast.success(e?.message);
  }
};

export default ToastMessage;
