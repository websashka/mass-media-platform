'use client'
import { ConnectKitButton } from "connectkit";
import styles from "./navbar.module.css";
import {ethers} from "ethers";
import {supabase} from "@/app/supabaseClient";

export default function Navbar() {

  const onConnect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    await provider.send("eth_requestAccounts", [])
    const address = await signer.getAddress();

    const { nonce } = await fetch("/api/auth/nonce", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address
      })
    }).then(res => res.json())

    const signature = await signer.signMessage(nonce)

    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        signature,
        nonce,
        address
      })
    }).then(res => res.json())
    await supabase.auth.setSession({
      access_token: res.token,
      refresh_token: res.token,
    })
  }

  return (
    <nav className={styles.navbar}>
      Mass Media Platform
      {/*<ConnectKitButton />*/}
      <button onClick={onConnect}>Metamask</button>
    </nav>
  );
}
