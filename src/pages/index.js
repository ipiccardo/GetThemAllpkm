import Head from "next/head";
import PokemonGrid from "@/components/pokemonsRender/PokemonGrid";
import ErrorBoundary from "@/components/errorHandler/ErrorBoundary";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary>
        <PokemonGrid />
      </ErrorBoundary>
    </>
  );
}
