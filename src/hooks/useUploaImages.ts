/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getImagesState } from '../redux/reducer/global';

const useUploadImage = () => {
  const state = useSelector(getImagesState);
  const url = 'https://api.cloudinary.com/v1_1/dlax3esau/image/upload';

  const uploadImages = async () => {
    const formData = new FormData();

    state.forEach((item: any) => {
      formData.append('file', item);
      formData.append('upload_preset', 'luis7g15');
    });

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    console.log('response', response);
    if (!response.ok) {
      throw new Error('Failed to upload images');
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: uploadImages,
  });
  return mutation;
};

export default useUploadImage;
