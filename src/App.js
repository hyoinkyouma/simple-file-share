import Nav from "./components/Nav.js";
import Button from "./components/Button.js";
import { useState } from "react";
function App() {
  const [qrCode, setQrCode] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleBtnFile = async () => {
    window.files.fileBrowser();
    await window.files.qrCode(async (e, code) => {
      setQrCode(code.code);
      setUrl(code.url);
      setFileName(code.filename);
    });
    await window.files.sendFilePath(async (e, path) => {
      console.log(path);
    });
  };

  return (
    <>
      <Nav />
      <div className="container flex flex-col items-center w-screen justify-center gap-10 h-[88vh]">
        {fileName && <span className="text-2xl text-center">{fileName}</span>}
        {qrCode && (
          <img style={{ height: "250px", width: "250px" }} src={qrCode} />
        )}
        {!qrCode && (
          <div className="flex flex-col items-center w-100 justify-center gap-6">
            <h1 className="text-4xl text-center">Select a file.</h1>{" "}
            <span className="text-xl w-7/12">
              This file share app generates a qr code and a link to a locally
              hosted webserver. Try it out.
            </span>
          </div>
        )}

        {url && <span className="text-md text-center">{url}</span>}
        <Button text={"Choose File"} onClick={handleBtnFile} />
      </div>
    </>
  );
}

export default App;
