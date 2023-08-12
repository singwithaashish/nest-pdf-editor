// import { useEffect, useRef, useState } from "react";

// export default function Pdftron({ urlCarrier }) {
//   const viewer = useRef(null);
//   const [instance, setInstance] = useState(null);

//   useEffect(() => {
//     console.log("Creating WebViewer instance with urlCarrier:", urlCarrier);

//     import("@pdftron/webviewer").then(({ default: WebViewer }) => {
//       WebViewer(
//         {
//           path: "/webviewer",
//           initialDoc: urlCarrier,
//         },
//         viewer.current
//       ).then((i) => {
//         console.log("WebViewer instance created:", i);
//         setInstance(i);
//         const { docViewer } = i;
//         // you can now call WebViewer APIs here...});
//       });
//     });
//   }, []);

//   useEffect(() => {
//     console.log("urlCarrier changed:", urlCarrier);
//     if (instance) {
//       console.log("Loading new document:", urlCarrier);
//       instance.UI.loadDocument(urlCarrier);
//     }
//   }, [urlCarrier, instance]);

//   return (
//     <div className="MyComponent">
//       <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
//     </div>
//   );
// }
