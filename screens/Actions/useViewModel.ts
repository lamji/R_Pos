import { globalState, setBarcode } from '@/src/redux/reducer/global';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

export default function useViewModel() {
  const dispatch = useDispatch();
  const dataState = useSelector(globalState);

  console.log(dataState);

  const handleScan = (barcode: string) => {
    if (dataState.searchType === 'scanNew') {
      dispatch(setBarcode(barcode));
      router.back();
    } else {
      // search product by barcode
    }
  };

  return {
    type: dataState.searchType,
    handleScan,
  };
}
