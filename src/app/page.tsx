//src/app/page.tsx

"use client";

import { getData } from "@/services/data";
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";

const Page = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['mydata'],
    queryFn: getData,
    //staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;

  return (

    <div className="">

      {data &&

        data.map((n) => (

          <div key={n.id}>

                          <Link
                              href={{
                                  pathname: '/subpage',
                                  query: { id: n.id },
                              }}
                          >
                             {n.name}

                            </Link>



          </div>

        ))}

    </div>
  );

}

export default Page;
