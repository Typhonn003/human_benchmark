import Head from "next/head";

const MetaTags = ({ pageName }: { pageName: string }) => {
  return (
    <Head>
      <title>{pageName}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Teste suas habilidades em nosso site de Human Benchmark! Jogue três jogos divertidos e desafie seus reflexos e precisão. Usuários logados podem salvar suas pontuações e acompanhar seu progresso."
      />
      <meta name="author" content="Diego Lima, Giovanni Perotto" />
      <meta property="og:title" content={pageName} />
      <meta property="og:site_name" content={pageName} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta
        property="og:description"
        content="Teste suas habilidades em nosso site de Human Benchmark! Jogue três jogos divertidos e desafie seus reflexos e precisão. Usuários logados podem salvar suas pontuações e acompanhar seu progresso."
      />
    </Head>
  );
};

export { MetaTags };
