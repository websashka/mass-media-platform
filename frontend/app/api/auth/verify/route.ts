import {NextResponse} from "next/server";
import {ethers} from "ethers";
import {supabase} from "@/app/services/supabase";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { address, nonce, signature } = body;
    const signerAddr = ethers.verifyMessage(nonce, signature)

    if(signerAddr !== address) {
      throw new Error("Wrong signature")
    }

    const { data: user } = await supabase.from("users")
      .select("*")
      .eq("address", address)
      .eq("nonce", nonce)
      .single()

    const token = jwt.sign({
      user,
      sub: user.id,
      aud: 'authenticated',
      role: 'authenticated',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }, process.env.SUPABASE_JWT_SECRET)


    return NextResponse.json({ user, token })
  } catch (err) {
    console.log(err)
  }
}