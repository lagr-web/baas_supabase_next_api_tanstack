//src/app/subpage/page.tsx

"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getQueryData } from "@/services/data";

export default function SubPage() {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();

  // 1️⃣ Se om data allerede findes i layoutets cache
  const cachedData = queryClient.getQueryData<any[]>(['mydata']);
  const cachedItem = cachedData?.find((d) => String(d.id) === id);

  // 2️⃣ Fetch kun hvis ikke i cache
  const { data } = useQuery({
    queryKey: ['data', id],
    queryFn: () => getQueryData(id!),
    initialData: cachedItem,
    enabled: !!id && !cachedItem,
  });

  return <div>{data?.lastname}</div>;
}
