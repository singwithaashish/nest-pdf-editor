import { PDFDocument } from "pdf-lib";
import { useState, useRef } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfData, setPdfData] = useState<any>(null);

  const loadPdf = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("http://localhost:3000/pdf", {
      method: "get",
      headers: {
        "Content-Type": "application/pdf",
      },
    });
    const pdfData = await res.arrayBuffer();
    setPdfData(pdfData);

    // convert pdf to blob
    // const blob = new Blob([pdfData], { type: "application/pdf" });

    setLoading(false);
  };

  // save the form pdf by sending it after it's filled to the server
  const savePdf = async () => {
    // getFormValuesFromIframe();
    if (!pdfData) return;

    const pdfDoc = await PDFDocument.load(pdfData);

    // Fill the PDF form fields (your code here)

    const form = pdfDoc.getForm();

    const firstName1Field = form.getTextField(
      "61daa6fb-0143-4faa-9243-790262d903f5firstName"
    );
    const lastName1Field = form.getTextField(
      "61daa6fb-0143-4faa-9243-790262d903f5lastName"
    );

    console.log(firstName1Field.getText(), lastName1Field);

    // firstName1Field.setText("John");
    // lastName1Field.setText("Doe");

    // console.log(firstName1Field.getText(), lastName1Field.getText());

    // // const nameField = form.getTextField("Name");

    // const fields = form.getFields();

    // fields.forEach((field) => {
    //   console.log(field.getName());
    // });

    // const filledPdfBytes = await pdfDoc.save();

    // // Save the filled PDF back to the server
    // const formData = new FormData();
    // const blob = new Blob([filledPdfBytes], { type: "application/pdf" });
    // formData.append("file", blob, "example.pdf");

    // const res = await fetch("http://localhost:3000/pdf/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (res.status === 200) {
    //   console.log("PDF saved successfully.");
    // } else {
    //   console.error("Failed to save PDF.");
    // }
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onIframeLoad = () => {
    console.log(URL.createObjectURL(
      new Blob([pdfData], { type: "application/pdf" })
    ))
    const iframeContentWindow = iframeRef.current?.contentWindow;

    const iframeDocument = iframeContentWindow!.document;

    // You can now interact with the content of the iframe's document
    // For example, you can access elements in the iframe's document:
    const iframeBody = iframeDocument.body;
    const iframeText = iframeBody.innerText;
    console.log(iframeText);
  };

  const handleIframeMessage = (event: any) => {
    console.log("Received message from iframe:", event);
    // Check if the message is from the expected source
    if (event.source === iframeRef!.current!.contentWindow) {
      // Handle the message data
      const formValues = event.data; // Assuming the iframe sends the form values
      console.log("Received form values from iframe:", formValues);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex h-full">
        <div className="w-1/5 bg-gray-100 flex flex-col gap-5 h-full p-5">
          <button
            className="bg-lime-500 text-white p-2 rounded shadow-xl"
            onClick={loadPdf}
          >
            {loading ? "Loading..." : "Load PDF"}
          </button>
          <button
            className="bg-lime-500 text-white p-2 rounded shadow-xl"
            onClick={savePdf}
          >
            Save PDF
          </button>
        </div>
        <div className="w-4/5 bg-gray-200 flex items-center justify-center">
          {!pdfData && (
            <p className="text-2xl text-gray-500">
              Click "Load PDF" to load the form
            </p>
          )}
          {pdfData && (
            // the iframe should have the same url as the current page
            <iframe
              ref={iframeRef}
              src={
                
                "http://localhost:5173/" + URL.createObjectURL(
                  new Blob([pdfData], { type: "application/pdf" })
                )
              }
              className="w-full h-full"
              onLoad={onIframeLoad}
            >
              press <a href="./resources/crayola.pdf">Download PDF</a>
            </iframe>
          )}
          {/* {pdfData && (
            <object
              data={`data:application/pdf;base64,${btoa(
                new Uint8Array(pdfData).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              type="application/pdf"
              className="w-full h-full"
              onLoad={onIframeLoad}
            >
              <p>PDF viewer is not supported by your browser.</p>
            </object>
          )} */}
        </div>
      </main>
    </div>
  );
}

