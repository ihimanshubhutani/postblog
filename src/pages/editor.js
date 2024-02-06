import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Dante3Editor from "@/components/Dante3Editor";

const EditorPage = () => {
  const router = useRouter();
  const filename = router.query.filename;
  const timeoutRef = useRef(null);

  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (timeoutRef.current !== null) {
        console.log(timeoutRef);
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    const handleUnload = () => {
      if (timeoutRef.current !== null) {
        // Save content when the user leaves the page
        saveContent();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [timeoutRef]);

  const saveContent = async () => {
    if (filename) {
      try {
        setSaving(true);
        await axios.put(`/api/files/${filename}`, {
          content: content,
        });
        setSaving(false);
        console.log("Content saved successfully!");
        timeoutRef.current = null;
      } catch (error) {
        console.error(`Error updating content for ${filename}:`, error);
      }
    }
  };

  const handleContentChange = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => saveContent(), 1000);
  };

  const handleUpdateFile = async () => {
    if (filename) {
      try {
        await axios.put(`/api/files/${filename}`, {
          content: content,
        });

        clearTimeout(timeoutRef.current);
      } catch (error) {
        console.error(`Error updating content for ${filename}:`, error);
      }
    }
  };

  return (
    <div className="w-full bg-white overflow-hidden flex flex-col pt-[42px] pb-[75px] pr-[11px] pl-0 box-border tracking-[normal] mq450:gap-[24px] mq950:gap-[47px]">
      <Navbar buttonHandler={handleUpdateFile} isSaving={saving} />
      <div className="bg-white dark:bg-black min-h-screen h-auto">
        <div className="sm:mx-10 mx-2 py-8 light">
          <Dante3Editor
            filename={filename}
            content={content}
            setContent={setContent}
            handleContentChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
