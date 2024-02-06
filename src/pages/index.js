import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BlogSection from "../components/BlogSection";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoadingError(true);
    } finally {
      // Set loading to false once files are fetched (whether successful or not)
      setLoading(false);
    }
  };

  const handleCreateNewFile = async () => {
    try {
      const fileId = uuidv4();
      const fileName = `${fileId}.json`;

      setLoading(true);
      // Call the API to create a new file
      await axios.post("/api/files/createFile", { fileName });

      // After creating a new file, refresh the list
      await fetchData();

      // Redirect to the editor with the new file name
      window.location.href = `/editor?filename=${fileName}`;
    } catch (error) {
      console.error("Error creating a new file:", error);
    }
  };

  // Sort blogs based on lastModifiedTimestamp in descending order
  const sortedBlogs = files.sort((a, b) => {
    const timeA = new Date(a.lastModified);
    const timeB = new Date(b.lastModified);
    return timeB - timeA;
  });

  return (
    <div>
      <div className="w-full relative bg-white overflow-hidden flex flex-col items-center justify-start pt-[42px] pb-[75px] pr-[11px] pl-0 box-border gap-[95px] tracking-[normal] mq450:gap-[24px] mq950:gap-[47px]">
        <Navbar buttonHandler={handleCreateNewFile} />
        <div className="w-80% mx-auto">
          <section className="w-[999px] flex flex-col items-start justify-start py-0 pr-[31px] pl-[31px] box-border text-center text-23xl text-black font-source-serif-4">
            <div className="flex-1 flex flex-col items-start justify-start gap-8 w-full md:gap-4 lg:gap-8">
              <h1 className="m-0 mb-[25px] text-inherit text-6xl font-semibold md:text-5xl lg:text-15xl">
                All Blogs
              </h1>
              {loadingError ? (
                <div className="text-center self-center">
                  No blog found, you are just a click away to write your first
                  blog...
                </div>
              ) : loading ? (
                <div className="text-center self-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                sortedBlogs.map((file) => (
                  <BlogSection
                    key={file.fileName}
                    title={
                      file.extractedContent[0]?.content?.[0]?.text || "No Title"
                    }
                    content={
                      file.extractedContent[1]?.content?.[0]?.text ||
                      "No Content"
                    }
                    filename={file.fileName}
                    lastModifiedTimestamp={file.lastModified}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
