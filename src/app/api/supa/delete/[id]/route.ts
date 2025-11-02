//src/app/api/supa/delete/[id]/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DeleteContext {
    params: Promise<{ id: string; }>;
}

export const DELETE = async (req: NextRequest, context: DeleteContext) => {

    const { id } = await context.params;//params bliver en Promise i next15.5        
    const numericId = Number(id);

    if (!numericId) {
        return NextResponse.json(
            { error: "ID mangler eller er ugyldigt" },
            { status: 400 }
        );
    }

    const { error } = await supabase
        .from("testarea")
        .delete()
        .eq("id", numericId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: `Item ${numericId} blev slettet` });



};
