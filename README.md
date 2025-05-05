# OpenScoreboard

OpenScoreboard is a modern, open-source platform for managing and showcasing game scoreboards. Built with [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io), and [Better-Auth](https://better-auth.dev), it provides a robust and scalable solution for developers and gamers alike.

## Features

- **Scoreboard Management**: Create, edit, and delete scoreboards with ease.
- **User Authentication**: Secure user authentication powered by Better-Auth.
- **API Integration**: Easily integrate scoreboards into your applications with a powerful API.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and ShadCN components.
- **Customizable**: Extend and customize the platform to fit your needs.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org) (or another supported database)
- [bun](https://bun.sh) (or your preferred package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/koyuawsmbrtn/openscoreboard.git
   cd openscoreboard
    ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up your environment variables:
    Copy `.env.example` to `.env` and configure your database connection and other settings.
    ```bash
    cp .env.example .env
    ```
4. Setup the database:
   Run the following commands to initialize the database and seed it with sample data:
   ```bash
   bunx prisma generate
   bunx prisma db push
   ```
5. Start the development server:
   ```bash
   bun dev
   ```
   Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Project Structure

This project is a monorepo managed with [TurboRepo](https://turbo.build). Here's an overview of the main directories:
- `apps/`: Contains the main application code.
  - `web/`: The Next.js application for the scoreboard.

## Deployment

### Vercel

The easiest way to deploy OpenScoreboard is to use [Vercel](https://vercel.com). Simply connect your GitHub repository and follow the prompts to deploy.

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Open a pull request

Please follow the [contribution guidelines](CONTRIBUTING.md) for more details and ensure your code adheres to our coding standards.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better-Auth Documentation](https://better-auth.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN Documentation](https://ui.shadcn.com/docs)
- [TurboRepo Documentation](https://turbo.build/docs)
- [bun Documentation](https://bun.sh/docs)

## Acknowledgements

Special thanks to the open-source community for their contributions and support. This project would not be possible without the hard work of many developers and contributors.