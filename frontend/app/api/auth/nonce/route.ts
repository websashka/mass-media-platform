import {NextResponse} from "next/server";
import {supabase} from "@/app/services/supabase";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { address, chain, networkType } = body;
    const nonce = uuidv4();

    const { data, error } =
      await supabase.from("users").select("nonce")
      .eq("address", address)
      .single()

    if(data) {
      await supabase.from("users").update({ nonce }).match({ address })
    }

    if(!data) {
      await supabase.from("users").insert({ nonce, address })
    }

    return NextResponse.json({ nonce})
  } catch (err) {
    console.log(err)
  }
}