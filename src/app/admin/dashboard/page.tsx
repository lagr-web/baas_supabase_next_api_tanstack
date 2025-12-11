//src/app/admin/dashboard/page.tsx

"use client";

import React, { Fragment, useState } from 'react';
import { Edit, Pencil, Trash2 } from "lucide-react";

import { getData } from "@/services/data";
import { useQuery } from '@tanstack/react-query';

import ConFirmDelete from './components/ConfirmDelete';
import UpdateData from './components/UpdateData';
import PostData from './components/PostData';

import UpdateDataAction from './components/UpdateDataAction'; // bruger server actions i stedet for tanstack mutation, men next egen mutation kan også bruges

type ModalMode = "delete" | "update" | "post" | null;

const Page = () => {

    const [openModal, setOpenModal] = useState<ModalMode>(null);
    const [mId, setMId] = useState<number | null>(0);

    const { data, isLoading } = useQuery({
        queryKey: ['mydata'],
        queryFn: getData,
        //staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const handleOpenModal = (mode: "delete" | "update" | "post", id?: number) => {

        console.log(mode);

        setMId(id || 0);
        setOpenModal(mode);
    };

    const handleCloseModal = () => {
        console.log('luk');
        setOpenModal(null);
        setMId(0);
    };


    if (isLoading) return <p>Loading...</p>;


    return (

        <>

            <header className="custom-header">
                <nav className="custom-navbar">
                    <h1 className="text-lg font-semibold">Personer</h1>
                    <ul className="flex gap-4">
                        <li className="hover:text-gray-300 cursor-pointer"
                            onClick={() => { handleOpenModal("post") }}>
                            Opret en person
                        </li>
                    </ul>
                </nav>
            </header>


            <div className="dashboard-content">
                <div className="p-5 grid justify-center mt-16">
                    <section className="dashboard-content-grid">
                        {data && data.map((items: any) => (

                            <Fragment key={items.id}>

                                <div className="bg-gray-500 p-2.5 rounded-l-md">
                                    {items.name} {items.lastname}
                                </div>

                                <div className="dashboard-content-fragtment"
                                    onClick={() => { handleOpenModal("update", items.id) }}
                                >
                                    <Pencil size={18} />
                                </div>

                                <div className="dashboard-content-fragtment rounded-r-md"
                                    onClick={() => { handleOpenModal("delete", items.id) }}
                                >
                                    <Trash2 size={18} />
                                </div>

                            </Fragment>
                        ))}
                    </section>
                </div>
            </div>

            {openModal === "delete" && (
                <ConFirmDelete close={handleCloseModal} id={mId} />
            )}

            {openModal === "update" && (
                <UpdateData close={handleCloseModal} id={mId} />
            )}

            {openModal === "post" && (
                <PostData close={handleCloseModal} />
            )}


        </>

    )
}

export default Page;