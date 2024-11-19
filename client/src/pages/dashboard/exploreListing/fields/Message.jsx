import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { sendMessageApi } from "../../../../services/api";
import usePropertyData from "../../../../hooks/usePropertyData";
import toast from "react-hot-toast";

const Message = ({ feedId }) => {
  const [message, setMessage] = useState("");
  const { property } = usePropertyData(feedId);

  useEffect(() => {
    initFlowbite();
  }, []);

  const handleChat = async (e) => {
    e.preventDefault();
    try {
      if (
        !property ||
        !property.data ||
        !property.data[0] ||
        !property.data[0].owner
      ) {
        console.log("Owner data is not available");
        return;
      }

      const sendMessage = await sendMessageApi(property.data[0].owner, message);

      if (sendMessage) {
        setMessage(""); // Clear the message input after sending
        toast.success("Message sent successfully");
      }
    } catch (error) {
      console.error("Error while sending message:", error);
      toast.error("Unable to send message");
    }
  };

  return (
    <>
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
          aria-controls={`message-drawer-${feedId}`}
          data-modal-target={`message-modal-${feedId}`}
          data-modal-toggle={`message-modal-${feedId}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </div>

      <div
        id={`message-modal-${feedId}`}
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex-col"
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Send Message
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={`message-modal-${feedId}`}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5 space-y-4">
              <div>
                <div className="mb-5">
                  Send Message to{" "}
                  <span className="font-semibold capitalize">
                    {property?.data[0]?.ownerData?.fullname || "Loading..."}
                  </span>
                </div>

                <form onSubmit={handleChat}>
                  <textarea
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white relative"
                    name="chat-text-area"
                    id="chat-text-area"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send message..."
                  ></textarea>

                  {message.length > 10 ? (
                    <button
                      type="submit"
                      className="bg-red p-1 rounded-full w-10 h-10 flex justify-center items-center absolute bottom-6 right-6"
                    >
                      <i class="fa-regular fa-paper-plane text-white"></i>
                    </button>
                  ) : (
                    ""
                  )}

                  {message.length < 10 ? (
                    <p className="text-red">
                      Message should be of minimum 10 characters
                    </p>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
