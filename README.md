# Scripture Memory

Scripture Memory is a Typescript project utilizing Supabase for DB and Auth, paired with Vercel's Frontend Cloud for hosting the Next.js app resource.

- [Tech Stack](#tech-stack)
- [Packages](#packages)
- [Local Environment](#local-environment)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Teardown](#teardown)
- [Linting](#linting)
- [Testing](#testing)
- [Unit Testing](#unit-testing)
- [Automated End-to-End (E2E) Testing](#automated-end-to-end-e2e-testing)

## Tech Stack

- [Next.js](https://nextjs.org/docs/getting-started/installation)
- [Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Vercel](https://vercel.com/docs/getting-started-with-vercel)

## Packages

- [Headless UI](https://github.com/tailwindlabs/headlessui?tab=readme-ov-file): "Completely unstyled, fully accessible UI components, designed to integrate with Tailwind CSS."
- [heroicons](https://github.com/tailwindlabs/heroicons?tab=readme-ov-file): "Free, MIT-licensed, high-quality SVG icons, by the makers of Tailwind CSS."
- [Framer-Motion](https://www.framer.com/motion/introduction/): "Simple, yet powerful, motion library for React."
- [React-Hook-Form](https://react-hook-form.com/get-started): "Performant, flexible and extensible forms for React with easy-to-use validation."
- [TailwindCSS](https://tailwindcss.com/docs/installation): "Utility-first CSS framework...that can be composed directly in your markup."
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html): "JavaScript with syntax for types; a strongly typed programming language that builds on JavaScript."
- [zod](https://zod.dev/?id=introduction): "TypeScript-first schema declaration and validation library."

## Local Environment

### Dependencies

- Node v20.11.0
- Npx v10.2.4
- Docker v.24.0.7
- VS Code IDE

### Setup

1. Clone Repo
2. Duplicate `.env.example` and rename to `.env.local`
3. Run command `npx supabase init`
4. Run command `npx supabase start`
5. From output on step 4, provide the anon_key and api url for `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_SUPABASE_URL` located in `.env.local`.
6. Run command `npm run dev`

### Teardown

- Stop local Supabase DB to prevent machine usage with `npx supabase stop`
- Stop JS server with `Ctrl-C` > `Y` on Node terminal

## Linting

Code analysis configured using the [ESLint](https://nextjs.org/docs/pages/building-your-application/configuring/eslint) linting utility. Run linting analysis with `npm run lint`.

## Testing

### Unit Testing

Unit tests built using the [Vitest](https://nextjs.org/docs/app/building-your-application/testing/vitest) testing framework. Set up Vitest by running `npm install -D vitest`. Run test files with `npm run test`.

### Automated End-to-End (E2E) Testing

Automated E2E tests built using the [Playwright](https://nextjs.org/docs/app/building-your-application/testing/playwright) testing framework. Setup Playwright by running `npm run playwright:install`. Run automated tests with `npm run playwright`.
