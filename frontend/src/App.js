import { PDFDocument } from "pdf-lib";
import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  const viewer = useRef(null);
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [usePdftron, setUsePdftron] = useState(false);
  // const [formFile, setFormFile] = useState(null);


  // Load the PDF, if using pdftron, add the event listener for fieldChanged
  const loadPdf = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/pdf/example.pdf", {
        method: "get",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      console.log(res);
      const pdfData = await res.arrayBuffer();
      setPdfData(pdfData);

      if (usePdftron)
        WebViewer(
          {
            path: "/webviewer/lib",
            // licenseKey:
            //   "demo:1691816942392:7c556f530300000000453cd60a0688af54438976805a17170fb2b114a9",
            initialDoc: URL.createObjectURL(
              new Blob([pdfData], { type: "application/pdf" })
            ),
            disabledElements: [
              "ribbons",
              "toolsHeader",
              "pageNavOverlay",
              "leftPanel",
            ],
            disableVirtualDisplayMode: true,
            enableAnnotations: true,
          },
          viewer.current
        ).then((instance) => {
          const { annotationManager } = instance.Core;
          // console.log("instance", annotationManager);

          annotationManager.addEventListener("fieldChanged", (field, value) => {
            if (value == "Off") {
              console.log("Off");
              return;
            }

            setFormValues((prev) => ({ ...prev, [field.name]: value }));
            // console.log(`Field changed: ${field.name}, ${value}`);
          });
        });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const savePdf = async (e) => {
    e.preventDefault();
    // if (saveLoading) return;
    // setSaveLoading(true);
    let formValuesLocal = formValues;
    
    if (!usePdftron) {
      const fvTemp = [
        ...document.querySelectorAll(
          ".textWidgetAnnotation input,.choiceWidgetAnnotation select,.radioButton input"
          ),
      ].map((formElement) => {
        console.log(formElement.name, formElement.value);
        return { [formElement.name]: formElement.value };
      });

      // setFormValues(fvTemp);
      
      formValuesLocal = fvTemp.reduce((acc, cur) => ({ ...acc, ...cur }), {});
    }
    const pdfDoc = await PDFDocument.load(pdfData);
    const form = pdfDoc.getForm();

    console.log(formValuesLocal);

    formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5firstName"] &&
      form
        .getTextField("61daa6fb-0143-4faa-9243-790262d903f5firstName")
        .setText(formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5firstName"]);

    formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5lastName"] &&
      form
        .getTextField("61daa6fb-0143-4faa-9243-790262d903f5lastName")
        .setText(formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5lastName"]);

    formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5roles"] &&
      form
        .getDropdown("61daa6fb-0143-4faa-9243-790262d903f5roles")
        .select(formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5roles"]);

    formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5time"] &&
      form
        .getRadioGroup("61daa6fb-0143-4faa-9243-790262d903f5time")
        .select(
          formValuesLocal["61daa6fb-0143-4faa-9243-790262d903f5time"] === "1"
            ? "fulltime"
            : "parttime"
        );

    formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfcfirstName"] &&
      form
        .getTextField("8a06c958-d66d-4e30-a5b5-41ac3abfdbfcfirstName")
        .setText(formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfcfirstName"]);

    formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfclastName"] &&
      form
        .getTextField("8a06c958-d66d-4e30-a5b5-41ac3abfdbfclastName")
        .setText(formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfclastName"]);

    formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfcroles"] &&
      form
        .getDropdown("8a06c958-d66d-4e30-a5b5-41ac3abfdbfcroles")
        .select(formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfcroles"]);

    formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfctime"] &&
      form
        .getRadioGroup("8a06c958-d66d-4e30-a5b5-41ac3abfdbfctime")
        .select(
          formValuesLocal["8a06c958-d66d-4e30-a5b5-41ac3abfdbfctime"] === "1"
            ? "fulltime"
            : "parttime"
        );

    const filledPdfBytes = await pdfDoc.save();

    // convert the array buffer back to a pdf file
    const formData = new FormData();
    const blob = new Blob([new Uint8Array(filledPdfBytes)], {
      type: "application/pdf",
    });
    formData.append("file", blob, "example.pdf");

    // setSaveLoading(true);
    // the nest backend is expecting multipart form data
    const res = await fetch("http://localhost:3000/pdf/example.pdf", {
      method: "POST",
      body: formData,
    });

    const data = res;
    console.log(data);
    // setSaveLoading(false);
  };

  return (
    <div className="MyComponent">
      <button onClick={loadPdf} className="button">{
          loading ? "Loading..." : "Load PDF"
      }</button>
      <button onClick={savePdf} className="button">
        {
            saveLoading ? "Saving..." : "Save"
        }
      </button>
      <button className="button" onClick={() => setUsePdftron((prev) => !prev)}>
        Use {
          <span style={{ color: usePdftron ? "lime" : "orange" }}>
            {!usePdftron ? "Pdftron" : "React-PDF"}
          </span>
        }
      </button>
      <div className="pdf-form">
        {
          !pdfData && <h2>
            click on load pdf to load the pdf
          </h2>
        }
      {pdfData && usePdftron && (
        <div
          className="webviewer"
          ref={viewer}
          style={{ height: "100vh" }}
        ></div>
      )}
      {pdfData && !usePdftron && (
        <Document
          file={
            new Blob([new Uint8Array(pdfData)], { type: "application/pdf" })
          }
          onLoadSuccess={(pdf) => {
            console.log(pdf);
          }}
        >
          <Page
            pageNumber={1}
            renderMode="
                svg"
            renderForms
            renderTextLayer
          />
        </Document>
      )}

    </div>
    </div>
  );
}

export default App;
