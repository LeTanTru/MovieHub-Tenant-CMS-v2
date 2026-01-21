import { EmployeeForm } from '@/app/employee/_components';
import { getQueryClient } from '@/components/providers/query-provider/get-query-provider';
import { apiConfig, queryKeys } from '@/constants';
import { ApiResponse, EmployeeResType } from '@/types';
import { http } from '@/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function getEmployee(id: string) {
  const res = await http.get<ApiResponse<EmployeeResType>>(
    apiConfig.employee.getById,
    {
      pathParams: {
        id
      }
    }
  );
  return res.data;
}

export default async function EmployeeSavePage(
  props: PageProps<'/employee/[id]'>
) {
  // const { id } = await props.params;
  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: [queryKeys.EMPLOYEE, { id }],
  //   queryFn: () => getEmployee(id)
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <EmployeeForm queryKey={queryKeys.EMPLOYEE} />
    // </HydrationBoundary>
  );
}
