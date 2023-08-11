import { PDFDocument } from "pdf-lib";
import { useRef, useState } from "react";
import {  pdfjs } from "react-pdf";
// import textlayer and annotationlayer styles
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function App() {
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
    console.log(res);
    const pdfData = await res.arrayBuffer();
    setPdfData(pdfData);

    setLoading(false);
  };


  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedRef = useRef<HTMLObjectElement>(null);

  const [pdfKey, setPdfKey] = useState<number>(0);

  

  const embedOnLoad = async () => {
    // Attempt to get the iframe's document
    console.log(embedRef.current?.data);

    // add a listener to embedRef
    // to listen for messages from the iframe

    embedRef.current?.contentWindow?.addEventListener(
      "message",
      (event: MessageEvent) => {
        console.log("message received from iframe", event.data);
      }
    );

    // this gives "data:application/pdf;base64,JVBERi0xLjcKJYGBgYEKCjEwIDAgb2JqCjw8Ci9CQ..."

    const binaryPdfData = atob(
      embedRef.current?.data!.split(",")[1]!
    );

    // Convert binary data to Uint8Array
    const uint8PdfData = new Uint8Array(binaryPdfData.length);
    for (let i = 0; i < binaryPdfData.length; i++) {
        uint8PdfData[i] = binaryPdfData.charCodeAt(i);
    }
    
    // Load PDF document using PDFDocument.load
    const pdfDoc = await PDFDocument.load(uint8PdfData);

    const form = pdfDoc.getForm();

    const firstName1Field = form.getTextField(
      "61daa6fb-0143-4faa-9243-790262d903f5firstName"
    );
    const lastName1Field = form.getTextField(
      "61daa6fb-0143-4faa-9243-790262d903f5lastName"
    );

    // formData.append("file", blob, "example.pdf");

    // form.getTextField("61daa6fb-0143-4faa-9243-790262d903f5firstName")!.setText("John");
    // form.getTextField("61daa6fb-0143-4faa-9243-790262d903f5lastName")!.setText("Doe");

    // // now convert the form back to a pdf
    // const filledPdfBytes = await pdfDoc.save();
    // // set the pdf data to the new pdf
    // setPdfData(filledPdfBytes);



    console.log(firstName1Field.getText(), lastName1Field.getText());

    // setPdfKey((prev) => prev + 1);



    // setup a message listener to receive messages from the embedded pdf
    window.addEventListener("message", (event) => {
      console.log("message received", event);
    });
  }

  const addvalueToPdf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = (e.target as HTMLFormElement).firstName.value;
    const lastName = (e.target as HTMLFormElement).lastName.value;
    const role1 = (e.target as HTMLFormElement).role1.value;
    const time = (e.target as HTMLFormElement).time.value;

    const firstName2 = (e.target as HTMLFormElement).firstName2.value;
    const lastName2 = (e.target as HTMLFormElement).lastName2.value;
    const role2 = (e.target as HTMLFormElement).role2.value;
    const time2 = (e.target as HTMLFormElement).time2.value;

    

    // this gives "data:application/pdf;base64,JVBERi0xLjcKJYGBgYEKCjEwIDAgb2JqCjw8Ci9CQ..."

    const binaryPdfData = atob(
      embedRef.current?.data!.split(",")[1]!
    );

    // Convert binary data to Uint8Array
    const uint8PdfData = new Uint8Array(binaryPdfData.length);
    for (let i = 0; i < binaryPdfData.length; i++) {
        uint8PdfData[i] = binaryPdfData.charCodeAt(i);
    }
    
    // Load PDF document using PDFDocument.load
    const pdfDoc = await PDFDocument.load(uint8PdfData);

    const form = pdfDoc.getForm();

    // get all the fields

    form.getFields().forEach((field) => {
      console.log(field.getName());
    });

    const firstName1Field = form.getTextField(
      "61daa6fb-0143-4faa-9243-790262d903f5firstName"
    );
    const lastName1Field = form.getTextField(
      "61daa6fb-0143-4faa-9243-790262d903f5lastName"
    );
    const role1Field = form.getDropdown("61daa6fb-0143-4faa-9243-790262d903f5roles");
    const time1Field = form.getRadioGroup("61daa6fb-0143-4faa-9243-790262d903f5time");

    const firstName2Field = form.getTextField("8a06c958-d66d-4e30-a5b5-41ac3abfdbfcfirstName");
    const lastName2Field = form.getTextField("8a06c958-d66d-4e30-a5b5-41ac3abfdbfclastName");
    const role2Field = form.getDropdown("8a06c958-d66d-4e30-a5b5-41ac3abfdbfcroles");
    const time2Field = form.getRadioGroup("8a06c958-d66d-4e30-a5b5-41ac3abfdbfctime");

    // set the values of the fields
    firstName1Field!.setText(firstName);
    lastName1Field!.setText(lastName);
    role1Field!.select(role1);
    time1Field!.select(time);

    firstName2Field!.setText(firstName2);
    lastName2Field!.setText(lastName2);
    role2Field!.select(role2);
    time2Field!.select(time2);

    // now convert the form back to a pdf
    const filledPdfBytes = await pdfDoc.save();
    
    // convert the array buffer back to a pdf file
    const formData = new FormData();
    const blob = new Blob([filledPdfBytes], { type: "application/pdf" });
    formData.append("file", blob, "example.pdf");
      // the nest backend is expecting multipart form data
    const res = await fetch("http://localhost:3000/pdf/example.pdf", {
      method: "POST",
      body: formData,
    });
    
    const data = res;
    console.log(data);
    // set the pdf data to the new pdf
    setPdfData(filledPdfBytes);
  }

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
          <form className="flex flex-col gap-5" onSubmit={e => addvalueToPdf(e)}>
          <button
          type="submit"
            className="bg-lime-500 text-white p-2 rounded shadow-xl"
            // onClick={embedOnLoad}
          >
            Save PDF
          </button>

            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className="border border-gray-300 p-2 rounded shadow-xl"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className="border border-gray-300 p-2 rounded shadow-xl"
            />
            <select name="role1" id="role1">
              <option value="developer">developer</option>
              <option value="testing">testing</option>
              <option value="admin">admin</option>
              <option value="marketing">marketing</option>
            </select>
            {/* parttime or fulltime radio */}
            <div className="flex gap-5">
              <div>
                <input
                  type="radio"
                  name="time"
                  id="parttime"
                  value="parttime"
                />
                <label htmlFor="parttime">Part Time</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="time"
                  id="fulltime"
                  value="fulltime"
                />
                <label htmlFor="fulltime">Full Time</label>
              </div>
            </div>
            <input type="text" name="firstName2" id="firstName2" placeholder="First Name" />
            <input type="text" name="lastName2" id="lastName2" placeholder="Last Name" />
            <select name="role2" id="role2">
            <option value="developer">developer</option>
              <option value="testing">testing</option>
              <option value="admin">admin</option>
              <option value="marketing">marketing</option>
            </select>

            <div className="flex gap-5">
              <div>
                <input
                  type="radio"
                  name="time2"
                  id="parttime2"
                  value="parttime"
                />
                <label htmlFor="parttime2">Part Time</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="time2"
                  id="fulltime2"
                  value="fulltime"
                />
                <label htmlFor="fulltime2">Full Time</label>
              </div>
            </div>


          </form>
        </div>
        <div className="w-4/5 bg-gray-200 flex items-center justify-center">
          {!pdfData && (
            <p className="text-2xl text-gray-500">
              Click "Load PDF" to load the form
            </p>
          )}
          {/* {pdfData && (
            // the iframe should have the same url as the current page
            <iframe
              ref={iframeRef}
              src={URL.createObjectURL(
                new Blob([pdfData], { type: "application/pdf" })
              )}
              className="w-full h-full"
              onLoad={onIframeLoad}
            >
              press <a href="./resources/crayola.pdf">Download PDF</a>
            </iframe>
          )} */}
          {/* After attempting with a lot of techniques, I still couldn't extract user entered data from pdf, pdfjs express looked promising though */}
          {pdfData && (
            <object
            ref={embedRef}
            key={pdfKey}
              data={`data:application/pdf;base64,${btoa(
                new Uint8Array(pdfData).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              type="application/pdf"
              className="w-full h-full"
              // onLoad={embedOnLoad}

            >
              <p>PDF viewer is not supported by your browser.</p>
            </object>
          )}

         
        </div>
      </main>
    </div>
  );
}

export default App;
