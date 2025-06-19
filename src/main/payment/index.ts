import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { PaginationStateWithQuery } from "../common/common.ts";
import { searchPayment } from "./reducers.ts";

const PaymentHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listPayment = useSelector(
    (state: RootState) => state.payment.listPayment
  );
  const totalPayment = useSelector(
    (state: RootState) => state.payment.totalPayment
  );

  const payment = useSelector((state: RootState) => state.payment.payment);

  const GetDataSearch = (paginationState) => {
    const handlePaginationState = {
      page: paginationState.current - 1,
      size: paginationState.pageSize,
      sort: paginationState.sort,
    };
    const searchField = paginationState.dataSearch;
    const query = PaginationStateWithQuery(handlePaginationState);
    dispatch(
      searchPayment({
        query,
        bodyRep: {
          ...searchField,
        },
      })
    );
  };

  return {
    GetDataSearch,
    listPayment,
    totalPayment,
    payment,
  };
};
export default PaymentHook;
