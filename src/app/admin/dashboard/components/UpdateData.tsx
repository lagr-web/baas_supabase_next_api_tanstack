//src/app/admin/dashboard/components/UpdateData.tsx

import TextFields from './Textfields';
import Button from './Button';
import { X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type Props = {

    close: () => void;
    id: number | null; // eller id: number | undefined

}

const UpdateData = ({ close, id }: Props) => {

if (id === null) return null;

    console.log(id);

    const queryClient = useQueryClient();

    const [statusMsg, setStatusMsg] = useState("");
    const [formData, setFormData] = useState({ name: "", lastname: "" });

   
    const { data, isLoading } = useQuery({
        queryKey: ["mydata", id],
        queryFn: async () => {
            const res = await fetch(`/api/supa/${id}`);
            if (!res.ok) throw new Error("Fejl ved hentning af data");
              const json = await res.json();
      return json;
        },
         enabled: !!id,// kun kør når id er sand
    });

    // Når data er hentet, sæt den i formState
    useEffect(() => {
        if (data) {
            const person = data.data ?? data; // håndtér begge formater
            setFormData({
                name: person.name || "",
                lastname: person.lastname || ""
            });
        }
    }, [data]);


    const updatePost = useMutation<any, Error, { id: number; data: any }>({

        mutationFn: async ({ id, data }) => {

            const res = await fetch(`http://localhost:3000/api/supa/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error("Fejl ved opdatering");
            return res.json();
        },
        onSuccess: () => {
            console.log("Post opdateret!");
            queryClient.invalidateQueries({ queryKey: ["mydata"] });
            setStatusMsg("Opdateret!");
            setTimeout(() => close(), 1000);
        },
        onError: (error) => {
            console.error("Fejl:", error);
            setStatusMsg("Noget gik galt ved opdatering.");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        //const form = e.currentTarget;
        // const formData = new FormData(form);

        //const data = Object.fromEntries(formData.entries()); // { name: '...', lastname: '...' }

        //console.log(data);

        // updatePost.mutate({ id, data });

        updatePost.mutate({ id, data: formData });

    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    return (

        <section
            className="modal-container"
            role="dialog"
            aria-modal="true"
        >
            <div className="grid grid-cols-1 items-center">

                <div className="justify-self-end" onClick={close}><X /></div>
            </div>

            <form onSubmit={handleSubmit}>

                <TextFields
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <span className="text-gray-400 text-sm">
                </span>

                <TextFields
                    label="Lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                />
                <span className="text-gray-400 text-sm">
                </span>

                <Button>
                    Opdater
                </Button>

            </form>

            <div className="block text-gray-600 text-center mt-2 font-medium text-base" role="status">
                {updatePost.isPending
                    ? "Opdatere..."
                    : statusMsg
                        ? statusMsg
                        : ""}
            </div>

        </section>

    )
}

export default UpdateData;
