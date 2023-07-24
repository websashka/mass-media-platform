"use client"
import React from "react";
import {createConfig, WagmiConfig} from "wagmi";
import {ConnectKitProvider, getDefaultConfig, SIWEConfig, SIWEProvider, SIWESession} from "connectkit";
import { polygonMumbai} from "viem/chains";
import {SiweMessage} from "siwe";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: "demo",
    // Required
    appName: "You Create Web3 Dapp",
    chains: [polygonMumbai],

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
  })
);


const siweConfig: SIWEConfig = {
    getNonce: async () => fetch('/api/siwe/nonce', {
      method: "POST",
    }).then((res) => res.json()).then(res => res.nonce),
  createMessage: ({ nonce, address, chainId }) => new SiweMessage({
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    address,
    chainId,
    nonce,
    // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
    statement: 'Sign in With Ethereum.',
  }).prepareMessage(),
  verifyMessage: async ({ message, signature }) => fetch('/api/siwe/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, signature }),
  }).then((res) => res.ok),
};

export default function CombinedProviders({children}: {
 children: React.ReactNode;
}) {
  return (<WagmiConfig config={config}>
    <SIWEProvider {...siweConfig}>
      <ConnectKitProvider mode="light">
        {children}
      </ConnectKitProvider>
    </SIWEProvider>
  </WagmiConfig>)
}