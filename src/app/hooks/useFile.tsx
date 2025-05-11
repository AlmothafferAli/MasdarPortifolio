import { useUploadFileMutation } from "../features/Api/fileApi";

export const useFile = () => {
  const [uploadFile] = useUploadFileMutation();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const response = await uploadFile(files).unwrap(); // <- unwrap to get actual result
    return response[0]; // assuming response is like: ["uploads/image.png"]
  };

  return { handleUpload };
};
