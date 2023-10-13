import { saveAs } from "file-saver";
import { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

function App() {
  const sigCanvas = useRef();

  const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
  };

  const createImage = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    let file = convertBase64ToFile(URL, "signature");
    saveAs(file, "signature");
  };

  return (
    <div className="h-[600px] w-screen text-center px-4">
      <h1 className="mt-12 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Create and Save your signatures
      </h1>
      <p className="mb-12 text-sm opacity-50">
        a small idea by{" "}
        <a className="underline text-indigo-600" href="https://rahmandev.com">
          M. Rahman
        </a>
      </p>
      <ReactSignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          className: "bg-white border border-2 w-full h-[400px] rounded-lg",
        }}
      />
      <div className="flex gap-4 justify-end my-4">
        <button
          onClick={() => sigCanvas.current.clear()}
          type="button"
          className="rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Clear
        </button>
        <button
          onClick={() => createImage()}
          type="button"
          className="rounded-md px-6 py-2 bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
