import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const UploadHandler = ({ contentType, blockOptions }) => {
  return async (file, block) => {
    if (file) {
      try {
        const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
        const githubReponame = process.env.NEXT_PUBLIC_GITHUB_REPONAME;

        const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubReponame}/contents/blogs/${contentType}/`;
        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        };

        const fileName = generateUniqueFileName(file.name);

        // Check if the file already exists
        const fileExists = await checkFileExists(apiUrl + fileName, headers);

        if (fileExists) {
          console.log(`File with filename '${fileName}' already exists.`);
          // Handle the case when the file already exists
          block.updateAttributes({
            src: apiUrl + fileName,
            url: apiUrl + fileName,
          });

          return;
        }

        const fileContent = await readFileAsBase64(file);

        if (!fileContent) {
          throw new Error("Failed to read file content.");
        }

        const data = {
          message: `Upload ${contentType}`,
          content: fileContent,
        };

        const response = await axios.put(apiUrl + fileName, data, { headers });

        if (response.status === 201) {
          // File uploaded successfully
          const fileUrl = response.data.content.download_url;

          // Update block content with the server URL
          block.updateAttributes({ src: fileUrl, url: fileUrl });

          return fileUrl;
        } else {
          throw new Error(
            `Failed to upload ${contentType}. Status: ${response.status}`
          );
        }
      } catch (error) {
        console.error(`Error uploading ${contentType} to the server:`, error);
      }
    }
  };
};

const generateUniqueFileName = (originalName) => {
  const uniqueName = `${uuidv4()}_${originalName}`;
  return uniqueName;
};

const checkFileExists = async (url, headers) => {
  try {
    const response = await axios.head(url, { headers });
    return response.status === 200;
  } catch (error) {
    // If the status is not 200, the file does not exist
    return false;
  }
};

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result.split(",")[1]);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export default UploadHandler;
