import { useRouter } from 'expo-router';

export default function useViewModel() {
  const router = useRouter();

  const handleRedirect = (url: any) => {
    router.push(url);
  };

  return {
    router,
    handleRedirect,
  };
}
9;
