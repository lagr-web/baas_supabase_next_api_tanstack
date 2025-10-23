//src/app/api/supa/[id]/route.ts

 import { NextResponse, NextRequest } from "next/server";
 import { createClient } from "@supabase/supabase-js";
 
 interface QueryContext {
   params: Promise<{ id: string;}>; //Next leverer altid route params som strings.
 }

  const supabase = createClient(//kalder vores Supabase client
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


export const GET = async (_req: NextRequest, context: QueryContext) => { 
    //route.params er et objekt
    const {id} = await context.params; //destructurerer objektet, 

    // hvis du har brug for det som numerisk værdi
/*     const {id} = await context.params;
       const numericId = Number(id); // eller parseInt(id)   */   

    //or

    /* const params = await context.params;
    const id = params.id; */

    //or

    //const id = (await context.params).id;

    //Supabase API
    const { data, error } = await supabase
        .from('testarea')
        .select('*')
        .eq('id', id) 
        .single(); // <== brug single() når du forventer ét unikt resultat

    if (error == null) return NextResponse.json({ data });

    return NextResponse.json({ error: error.message })

 }
