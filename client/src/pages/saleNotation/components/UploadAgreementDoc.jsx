import React, { useState } from "react";

const UploadAgreementDoc = () => {
  const [agreementDoc, setAgreementDoc] = useState(null);
  const [filePath, setFilePath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agreement Doc:", agreementDoc);
    console.log("File Path:", filePath); // This will display the pseudo path (file name)
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAgreementDoc(file);
      setFilePath(e.target.value); // This will give you the pseudo file path (fake path with the file name)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full px-5 py-1 rounded-md"
    >
      <input
        type="file"
        className="file-input w-full max-w-xs"
        onChange={handleFileChange}
      />
      {filePath && <p className="text-sm text-gray-500">{filePath}</p>}
      {agreementDoc && (
        <button type="submit">
          <i className="fa-solid fa-upload text-xl text-red"></i>
        </button>
      )}
    </form>
  );
};

export default UploadAgreementDoc;
