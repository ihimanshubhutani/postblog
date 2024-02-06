// components/BlogSection.js
import React, { useState } from "react";
import Link from "next/link";

const formatTimeDifference = (timestamp) => {
  const now = new Date();
  const lastModified = new Date(timestamp);
  const timeDifference = now - lastModified;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
};

const BlogSection = ({ title, content, filename, lastModifiedTimestamp }) => {
  const formattedTimeDifference = formatTimeDifference(lastModifiedTimestamp);

  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    const shareableLink = `${window.location.origin}/editor?filename=${filename}&shared`;

    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);

      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-4 text-xl">
      <div className="text-sm font-light">{formattedTimeDifference}</div>
      <Link
        className="flex flex-col items-start justify-start gap-4 "
        href={`/editor?filename=${filename}`}
      >
        <div className="leading-[12px] font-semibold mq450:text-base mq450:leading-[10px]">
          {title}
        </div>
        <div className="leading-7 font-regular text-left">
          <p className="m-0">{content}</p>
        </div>
      </Link>
      <div
        className="flex gap-2 self-end cursor-pointer"
        style={{ alignSelf: "end" }}
        onClick={handleCopyToClipboard}
      >
        <button
          type="button"
          className="js-clipboard py-3 px-4 group inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-clipboard-target="#hs-clipboard-input"
          data-clipboard-action="copy"
          data-clipboard-success-text="Copied"
          onClick={handleCopyToClipboard}
        >
          {!copied && (
            <svg
              className="js-clipboard-default w-4 h-4 group-hover:rotate-6 transition"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          )}

          <svg
            className={`js-clipboard-success ${
              copied ? "" : "hidden"
            } w-4 h-4 text-blue-600`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="js-clipboard-success-text">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
        <div className="h-0.5 w-full bg-shade-300" />
      </div>
    </div>
  );
};

export default BlogSection;
