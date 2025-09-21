'use client';
import Header from "../components/ui/Header";
import Metrics from "../components/ui/Metrics";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="p-4 bg-transparent text-teal-500 rounded-sm w-full xl:w-7xl flex justify-center">
          <div className="border-1 border-teal-500 flex w-full p-4 justify-center rounded-sm">
          <span className="material-icons text-teal-500">signal_cellular_alt</span>
          <span className="px-4">{new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</span>
          All System Operations
        </div>
          </div>
        <Metrics />
      </div>
    </>
  );
}
