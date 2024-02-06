import axios from "axios";

const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
const githubReponame = process.env.NEXT_PUBLIC_GITHUB_REPONAME;
const accessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
const baseURL = `https://api.github.com/repos/${githubUsername}/${githubReponame}/contents`;

const githubApi = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});

const getFileDetails = async (file, folderPath) => {
  const commitURL = `https://api.github.com/repos/${githubUsername}/${githubReponame}/commits?path=${folderPath}/${file.name}`;
  const commitResponse = await githubApi.get(commitURL);
  return commitResponse.data[0].commit;
};

const getFilesList = async (folderPath) => {
  try {
    const response = await githubApi.get(`/${folderPath}`);
    return response.data.map((file) => file.name);
  } catch (error) {
    console.error("Error fetching file list:", error);
    throw error;
  }
};

const getFileContent = async (file, folderPath) => {
  try {
    const commitDetails = await getFileDetails(file, folderPath);

    const lastModified = commitDetails.author.date;

    // Fetch file content
    const contentResponse = await githubApi.get(file.download_url, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    });

    // Extract the first and second objects from the content array
    const extractedContent = contentResponse.data.content.slice(0, 2);

    return {
      fileName: file.name,
      extractedContent,
      lastModified,
    };
  } catch (error) {
    console.error("Error fetching content for file:", file.name, error);
    throw error;
  }
};

export default async function handler(req, res) {
  const folderPath = "blogs";

  try {
    const fileList = await getFilesList(folderPath);
    const filesData = await Promise.all(
      fileList.map(async (fileName) => {
        // Skip processing files from the "files" folder
        if (fileName === "files") {
          return null;
        }

        try {
          const file = {
            name: fileName,
            download_url: `${baseURL}/${folderPath}/${fileName}`,
          };
          const fileContent = await getFileContent(file, folderPath);
          return fileContent;
        } catch (contentError) {
          console.error(
            "Error fetching content for file:",
            fileName,
            contentError
          );
          return {
            fileName,
            extractedContent: [], // or handle this case based on your requirements
          };
        }
      })
    );

    // Filter out null values (files from the "files" folder)
    const filteredFilesData = filesData.filter((fileData) => fileData !== null);

    res.status(200).json(filteredFilesData);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files." });
  }
}
