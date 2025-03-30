# Developer Conferences

A modern Nuxt 3 application that allows users to explore developer conferences from around the world.

This project is based on the amazing open source project [Developer Conferences Agenda](https://github.com/scraly/developers-conferences-agenda) by [Aurélie Vache](https://github.com/scraly) that lists in a GitHub repository all the developer conferences and CFPs in the world. This Nuxt application completely relies on the data provided by the [Developer Conferences Agenda](https://github.com/scraly/developers-conferences-agenda) repository and is not meant to be a replacement for it, nor a replacement for its website [developers.events](https://developers.events) that provides a nice way to explore the conferences.

This project is a personal initiative to learn and experiment with GitHub Copilot Agent Mode to create a simple website using Nuxt. I happened to choose to test GitHub Copilot Agent Mode to develop a small website that lists developer conferences, using the data publicly made available by the Developer Conferences Agenda project.

This project is not affiliated with the original project or its maintainers, but I encourage you to check their [repository](https://github.com/scraly/developers-conferences-agenda) and show your support with a star.

## Features

- 📆 Interactive calendar view of developer conferences
- 🌍 Filter conferences by country
- 🔗 Direct links to conference websites

## Tech Stack

- [Nuxt 3](https://nuxt.com) - The Vue framework for building modern web applications
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- [Nuxt UI Pro](https://ui.nuxt.com/pro) - Premium UI components for Nuxt
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Internationalized Date](https://github.com/adobe/react-spectrum/tree/main/packages/%40internationalized/date) - Date utilities with internationalization support

## Data Source

All the data used in this application comes from this project and is retrieved from the [developers.events](https://developers.events) website that makes publicly available JSON files with all the conferences and CFPs of the [Developer Conferences Agenda](https://github.com/scraly/developers-conferences-agenda) project.

## Getting Started

### Prerequisites

- Node.js (v18.x or newer)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/developer-conferences.git
cd developer-conferences

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your Nuxt UI Pro license if you have one
```

### Development

```bash
# Start the development server
pnpm dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Data Source

This application uses data from:
- [developers.events](https://developers.events) - Provides the conference data via API
- [Developers Conferences Agenda](https://github.com/scraly/developers-conferences-agenda) - Original data source

## License

MIT

## Acknowledgments

- This project was inspired by [developers.events](https://developers.events)
- Thanks to the [Developers Conferences Agenda](https://github.com/scraly/developers-conferences-agenda) repository for providing the conference data