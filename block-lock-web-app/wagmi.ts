import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet, moonbaseAlpha } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultConfig } from 'connectkit';

const alchemyID = process.env.NEXT_PUBLIC_ALCHEMY_ID; // Your Alchemy ID

const { chains, publicClient:customPublicClient, webSocketPublicClient:customWebSocketPublicClient } = configureChains(
  [mainnet, goerli,moonbaseAlpha],
  [
    alchemyProvider({apiKey:alchemyID}), // Use Alchemy provider
    publicProvider()
  ],
)

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: alchemyID, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    // Required
    appName: "Ethhack",
    publicClient:customPublicClient,
    chains:chains,
    webSocketPublicClient:customWebSocketPublicClient
  })
)