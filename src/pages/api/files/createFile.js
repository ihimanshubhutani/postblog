import axios from "axios";

export default async function handler(req, res) {
  const { fileName } = req.body; // Assuming you pass the desired file name in the request body

  if (!fileName) {
    return res
      .status(400)
      .json({ error: "Missing fileName in the request body." });
  }

  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const githubReponame = process.env.NEXT_PUBLIC_GITHUB_REPONAME;
  const accessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
  const folderPath = "blogs";
  const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubReponame}/contents/${folderPath}/${fileName}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const fileContent = {
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
  };

  const data = {
    message: `Create new JSON file: ${fileName}.json`,
    content: Buffer.from(JSON.stringify(fileContent)).toString("base64"),
  };

  try {
    const response = await axios.put(apiUrl, data, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to create a new JSON file on GitHub." });
  }
}
