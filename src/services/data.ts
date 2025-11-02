//src/service/data.ts

export type Names = {
    id: number;
    name: string;
    lastname: string;
};


export const getData = async (): Promise<Names[]> => {

    const res = await fetch('http://localhost:3000/api/supa/');

    if (!res.ok) {
        throw new Error('Failed to fetch data'
        );
    }

    const json = await res.json();
    return json.data; //vi returnerer kun arrayet

} 


export const getQueryData = async (id: string | null) => {
  if (!id) {
    throw new Error("Missing id for data query");
  }

  const res = await fetch(`http://localhost:3000/api/supa/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data from Supabase");
  }

  const json = await res.json();
  return json.data;

};

