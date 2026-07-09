import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://docs-nine-ochre.vercel.app",
  integrations: [
    starlight({
      title: "FlowTrack Finances",
      description: "Documentação técnica do Tech Challenge FIAP — Fase 02",
      favicon: "/favicon-32x32.png",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
        },
      ],
      logo: {
        src: "./src/assets/logo.svg",
        alt: "FlowTrack Finances",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "Português",
          lang: "pt-BR",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pedroh-cm/flow-tracker-finances",
        },
      ],
      sidebar: [
        {
          label: "Introdução",
          items: [
            { label: "Visão Geral", slug: "introducao/visao-geral" },
            { label: "Arquitetura", slug: "introducao/arquitetura" },
          ],
        },
        {
          label: "Microfrontends",
          items: [
            { label: "Module Federation", slug: "microfrontends/module-federation" },
            { label: "Shell e Remotes", slug: "microfrontends/shell-e-remotes" },
            { label: "Event Bus", slug: "microfrontends/event-bus" },
          ],
        },
        {
          label: "Funcionalidades",
          items: [
            { label: "Autenticação JWT", slug: "funcionalidades/autenticacao" },
            { label: "Dashboard", slug: "funcionalidades/dashboard" },
            { label: "Transações", slug: "funcionalidades/transacoes" },
            { label: "Investimentos", slug: "funcionalidades/investimentos" },
          ],
        },
        {
          label: "Guias",
          items: [
            { label: "Começando", slug: "guias/comecando" },
            { label: "Desenvolvimento", slug: "guias/desenvolvimento" },
            { label: "Deploy", slug: "guias/deploy" },
            { label: "Docker", slug: "guias/docker" },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
