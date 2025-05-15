import { toast } from "react-toastify";

import { IUltraMsg } from "../features/Type/Interfaces";
import { handleError } from "./useHandleError";

import { useSendUltraMsgMutation } from "../features/Api/UltraMsgApi";
export const useUltraMsg = () => {
  const [sendUltraMsg, { isLoading: isSendingUltraMsg }] =
    useSendUltraMsgMutation();

  const handleSendUltraMsg = async (ultraMsg: IUltraMsg) => {
    if (!ultraMsg.message || !ultraMsg.phoneNumber) {
      toast.error("يجب ادخال كل الحقول");
      return;
    }

    try {
      await sendUltraMsg(ultraMsg).unwrap();
      toast.success("تم ارسال الرسالة بنجاح");
    } catch (error: unknown) {
      handleError(error as { data?: { message?: string } });
    }
  };

  return { handleSendUltraMsg, isSendingUltraMsg };
};
