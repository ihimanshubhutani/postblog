# PostBlog Editor

## Overview

The PostBlog Editor Tool is a web application built with Next.js, Dante3 editor, and Tailwind CSS. It provides a user-friendly interface for creating and editing blog content. The tool also integrates with GitHub, allowing users to store and retrieve blog content from a GitHub repository.

## Features

- Dante3 Editor: Utilizes the Dante3 editor for a rich and intuitive writing experience.
- Image Upload: Supports image upload functionality within the editor.
- Text Formatting: Provides options for text formatting, making it easy to create well-formatted blog posts.
- GitHub Integration: Enables storing and retrieving blog content from a specified GitHub repository.
- Security: Supports secure authentication through environment variables, including the use of personal access tokens.

## Technology Stack

- Next.js: A React framework for building web applications.
- Dante3: An open-source blog editor for React.
- Tailwind CSS: A utility-first CSS framework for building responsive and stylish interfaces.
- GitHub API: Used for integrating with GitHub repositories.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
  - Compatible Node.js version: v18.17.0
- [Yarn](https://yarnpkg.com/) - Dependency manager

### Setup

1. Clone the repository:

   ```bash
   cd blog-editor
   ```

2) **Install dependencies:**

   ```bash
    yarn install

   ```

3) **Set up Environment Variables:**

   - Create a `.env.local` file in the root of the project and add the following variables:

   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=YOUR_USER_NAME
   NEXT_PUBLIC_GITHUB_REPONAME=YOUR_GITHUB_REPOSITORY_NAME
   NEXT_PUBLIC_GITHUB_ACCESS_TOKEN=YOUR_GITHUB_ACCESS_TOKEN
   ```

   Take reference from `.env.template` to create your `.env.local` file.

3. **Start the application:**

   ```bash
   yarn dev

   ```

4. **Open your browser and navigate to http://localhost:3000 to use the application.**

## Docker Setup

### Build Docker Image

```bash
docker build -t blog-editor .
```

### Run Docker Container

```bash
docker run -p 3000:3000 blog-editor
```

**After running the container, open your browser and navigate to http://localhost:3000 to access the application.**

## Usage

1. Open the blog editor in your web browser.
2. Write or edit your blog content using the editor.
3. Use the provided options for image upload and text formatting.
4. Click the "Save Blog" button to save your content to the specified GitHub repository.
5. Click on copy button to share the blog with others.
