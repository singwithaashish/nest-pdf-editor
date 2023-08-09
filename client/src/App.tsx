import { useEffect, useState } from "react";

function App() {
  const [pdf, setPdf] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPdf = async () => {
    // get pdf from backend 
    if (loading) return;
    setLoading(true);
    const res = await fetch("http://localhost:3000/pdf");
    const pdf = await res.blob();
    setLoading(false);
    setPdf(pdf);
  };
  // useEffect(() => {
  //   loadPdf();
  // }, []); 

  return (
    <div className="flex flex-col h-screen">
      <main className="flex h-full">
        <div className="w-1/5 bg-gray-100 flex flex-col gap-5 h-full p-5">
          <button className="bg-lime-500 text-white p-2 rounded shadow-xl" onClick={loadPdf}>
            {loading ? "Loading..." : "Load PDF"}
          </button>
          <button className="bg-lime-500 text-white p-2 rounded shadow-xl">
            Save PDF
          </button>
        </div>
        <div className="w-4/5 bg-gray-200 flex items-center justify-center">
        {!pdf && <p className="text-2xl text-gray-500">Click "Load PDF" to load the form</p>}
        {pdf && <iframe src={URL.createObjectURL(pdf)} className="w-full h-full"></iframe>}
        </div>
      </main>
    </div>
  );
}

export default App;
