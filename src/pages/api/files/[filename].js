// Example Next.js API route to handle both GET and PUT requests for a file
import axios from "axios";

const getDefaultContent = () => ({
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        {
          type: "text",
          text: "Write your title here...",
        },
      ],
    },
  ],
});

export default async function handler(req, res) {
  const { filename } = req.query;

  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const githubReponame = process.env.NEXT_PUBLIC_GITHUB_REPONAME;
  const accessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
  const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubReponame}/contents/blogs/${filename}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (req.method === "GET") {
    // Handle GET request to fetch file content
    try {
      const response = await axios.get(apiUrl, { headers });
      const content = Buffer.from(response.data.content, "base64").toString(
        "utf-8"
      );

      res.status(200).json({ content: JSON.parse(content) });
    } catch (error) {
      console.error(`Error fetching content for ${filename}:`, error);
      res
        .status(500)
        .json({ error: "Failed to retrieve the content from GitHub." });
    }
  } else if (req.method === "PUT") {
    // Handle PUT request to update file content

    const existingFile = await axios.get(apiUrl, { headers });
    const { sha } = existingFile.data;

    const newContent = req.body.content || getDefaultContent(); // Use provided content or default content

    try {
      const updatedFile = await axios.put(
        apiUrl,
        {
          message: `Feat: Blog file ${filename} Updated`,
          content: Buffer.from(JSON.stringify(newContent)).toString("base64"),
          sha,
        },
        { headers }
      );

      res.status(200).json(updatedFile.data);
    } catch (error) {
      console.error(`Error updating content for ${filename}:`, error);
      res
        .status(500)
        .json({ error: "Failed to update the content on GitHub." });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
