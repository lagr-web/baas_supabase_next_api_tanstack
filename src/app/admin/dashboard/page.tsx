//src/app/admin/dashboard/page.tsx

"use client";

import React, { Fragment, useState } from 'react';
import { Edit, Pencil, Trash2 } from "lucide-react";

import { getData } from "@/services/data";
import { useQuery } from '@tanstack/react-query';
import ConFirmDelete from './components/ConfirmDelete';
import UpdateData from './components/UpdateData';
import PostData from './components/PostData';

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

            <header className="w-full fixed top-0 left-0 bg-gray-900 text-white p-4 shadow-md z-50">
                <nav className="flex justify-between items-center max-w-6xl mx-auto">
                    <h1 className="text-lg font-semibold">Personer</h1>
                    <ul className="flex gap-4">
                        <li><a href="#" className="hover:text-gray-300" onClick={() => { handleOpenModal("post") }}>Opret en person</a></li>

                    </ul>
                </nav>
            </header>

            <div className="bg-gray-200 min-h-screen overflow-y-hidden">
                <div className="p-5 grid justify-center mt-16">
                    <section className="grid grid-cols-[300px_60px_60px] gap-0.5 w-fit text-white text-sm">
                        {data && data.map((items: any) => (
                            <Fragment key={items.id}>
                                <div className="bg-gray-500 p-2.5">{items.name} {items.lastname}</div>
                                <div className="bg-gray-800 p-2.5 grid items-center justify-center hover:cursor-pointer hover:bg-gray-400" onClick={() => { handleOpenModal("update", items.id) }}> <Pencil size={18} /></div>
                                <div className="bg-gray-800 p-2.5 grid items-center justify-center hover:cursor-pointer hover:bg-gray-400" onClick={() => { handleOpenModal("delete", items.id) }} > <Trash2 size={18} /></div>
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