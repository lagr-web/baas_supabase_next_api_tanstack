// src/app/api/supa/update/[id]/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UpdateContext {
    params: Promise<{ id: string }>; //next 15.5 kræver en Promise
}

interface UpdateFields {
    name?: string;
    lastname?: string;
}

export const PUT = async (req: NextRequest, context: UpdateContext) => {

    try {
        // 1. Hent id fra route params
        const { id } = await context.params;

        const numericId = isNaN(Number(id)) ? id : Number(id);//underersøger om id er et tal eller string

        const body = await req.json();

        // Partial<T> gør alle properties i typen valgfrie (optional).
        // Så Partial<UpdateFields> betyder at objektet KAN have name og/eller lastname, 
        // men ingen af felterne er påkrævet. Dette er perfekt til partial updates,
        // hvor vi kun vil opdatere nogle af felterne.
        //any slår TypeScripts type-checking helt fra
        //T er en type parameter der bevarer type-checking 

        const updateData: Partial<UpdateFields> = {};// Objekt til at holde opdateringsdata

        //Lav en liste over felter (type-sikkert)
        const fields: (keyof UpdateFields)[] = ["name", "lastname"];

        //Fyld updateData dynamisk, kun med gyldige felter

        //Iterer over felterne og tjek om de findes i body
        
        fields.forEach((field) => {

            const val = body?.[field];
            if (val !== undefined) {
                updateData[field] = val;
            }
            
        });

        console.log("Update data:", updateData);

        if (Object.keys(updateData).length === 0) { // Hvis der ikke er noget at opdatere
            return NextResponse.json({ error: "Ingen felter at opdatere" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("testarea")
            .update(updateData)
            .eq("id", numericId)
            .select('*');

        if (error) throw error;

        if (!data?.length) {
            return NextResponse.json(
                { error: "Record not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: `Item ${numericId} blev opdateret`,
            data: data[0]
        });

    } catch (error) {
        // Log fejlen til konsollen for debugging
       const msg = error instanceof Error ? error.message : String(error);
        console.error('Update error:', msg);
        return NextResponse.json(
            { error: "Der skete en fejl ved opdatering" },
            { status: 500 }
        );
    }
};// end PUT

