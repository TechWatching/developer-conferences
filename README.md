# Developer Conferences

A modern Nuxt 3 application that allows users to explore developer conferences from around the world.

## Features

- 📆 Interactive calendar view of developer conferences
- 🌍 Filter conferences by country
- 🔗 Direct links to conference websites

## Acknowledgments

This project is based on the amazing open source project [Developer Conferences Agenda](https://github.com/scraly/developers-conferences-agenda) by [Aurélie Vache](https://github.com/scraly) that lists in a GitHub repository all the developer conferences and CFPs in the world. This Nuxt application completely relies on the data provided by the [Developer Conferences Agenda](https://github.com/scraly/developers-conferences-agenda) repository and is not meant to be a replacement for it, nor a replacement for its website [developers.events](https://developers.events) that provides a nice way to explore the conferences around the world.

This project is a personal initiative to learn and experiment with GitHub Copilot Agent Mode to create a simple website using Nuxt. For this experiment, I decided to build a small website that lists developer conferences, using data made publicly available by the Developer Conferences Agenda project.

This project is not affiliated with the original project or its maintainers, but I encourage you to check their [repository](https://github.com/scraly/developers-conferences-agenda) and show your support with a star.

## Tech Stack

- [Nuxt 3](https://nuxt.com) - The Vue framework for building modern web applications
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- [Nuxt UI Pro](https://ui.nuxt.com/pro) - Premium UI components for Nuxt
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Internationalized Date](https://github.com/adobe/react-spectrum/tree/main/packages/%40internationalized/date) - Date utilities with internationalization support

## Deployment and Hosting

This website is hosted on an [Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps?wt.mc_id=MVP_430820).
The Azure resources are provisioned using [Pulumi](https://www.pulumi.com/) with TypeScript and the [Azure Native provider](https://www.pulumi.com/registry/packages/azure-native/).
The repository contains a GitHub Actions workflow that automatically provision the Azure infrastructure and deploys the application to Azure Static Web Apps.

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