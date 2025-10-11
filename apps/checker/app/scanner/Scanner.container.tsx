'use client';

import { Box, CheckCircleIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Camera, XCircle, RefreshCcw, CheckCircle2 } from "lucide-react";
import QrScanner from "qr-scanner";

export default function ScannerContainer({
  checkPointCode,
}: {
  checkPointCode: string;
}) {

   // const { showMessage } = useRootContext();
  const [qrText, setQRText] = useState<string | undefined>();
  //const [scannedPerson, setScannedPerson] = useState<Participant | undefined>();
  const [scannedPerson, setScannedPerson] = useState<any | undefined>();
  const [isLoading, setisLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [camState, setCamState] = useState<'user' | 'environment'>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScanner = useRef<QrScanner>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const qr = new QrScanner(
      videoRef.current,
      (result: any) => {
        console.log('result', result);
        setQRText(result.data);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,

        // maxScansPerSecond: 10,
      }
    );
    qr.start();
    qrScanner.current = qr;

    /**
     * Reload the app for cache clearing
     * refresh after every 30 mins
     */
    setTimeout(() => {
      window.location.reload();
    }, 60 * 60 * 1000);

    return () => {
      qrScanner.current?.stop();
      qrScanner.current?.destroy();
    };
  }, [videoRef, showScanner]);

  useEffect(() => {
    if (!qrText) return;

    console.log('QR Text changed:::', qrText);

   // handleOnCheckIn(qrText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrText]);

//   const handleOnCheckIn = async (refId: string) => {
//     try {
//       setisLoading(true);
//       const updatedParticipant = await handleParticipantCheckIn(
//         refId,
//         checkPointCode
//       );

//       setScannedPerson({
//         ...updatedParticipant,
//       });

//       setTimeout(() => {
//         setScannedPerson(undefined);
//       }, 4000);

//       setisLoading(false);
//     } catch (e) {
//       // Errors are caught here
//       const error = e as Error;
//       showMessage('ERROR', error.message);
//       console.error('Error Scanning', e);
//       setisLoading(false);
//     }
//   };

useEffect(() => {
    if (!qrText) return;

    console.log("QR Detected:", qrText);
    setisLoading(true);

    // Simulate scanned person info (mock)
    setTimeout(() => {
      setScannedPerson({ employee_name: "John Doe" });
      setisLoading(false);

      // Auto close popup
      setTimeout(() => setScannedPerson(undefined), 3000);
    }, 1500);
  }, [qrText]);


  useEffect(() => {
    console.log('useEffect', { camState });
    if (camState) qrScanner.current?.setCamera(camState);
  }, [camState]);

  const handleSwitchCamera = () => {
  const newCam = camState === "user" ? "environment" : "user";
  setCamState(newCam);
  qrScanner.current?.setCamera(newCam);
};

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-black relative">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <div className="h-10 w-10 border-4 border-gray-400 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* Camera Switch */}
      <button
        onClick={handleSwitchCamera}
        className="p-3 bg-gray-100 rounded-full mb-4 shadow-md active:scale-95"
      >
        <Camera className="w-6 h-6 text-gray-700" />
      </button>

      {/* Video Preview */}
      <div className="w-[75vw] max-w-[780px] rounded-2xl overflow-hidden border shadow-md">
        <video ref={videoRef} className="w-full rounded-2xl" />
      </div>

      {/* Result Backdrop */}
      {scannedPerson && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-20">
          <div className="flex flex-col items-center">
            <CheckCircle2 className="text-green-600 w-20 h-20 mb-4" />
            <h2 className="text-2xl font-semibold">Welcome!</h2>
            <p className="text-3xl font-bold mt-2">{scannedPerson.employee_name}</p>

            <button
              onClick={() => setScannedPerson(undefined)}
              className="mt-6 p-3 bg-red-500 text-white rounded-full hover:bg-red-600 active:scale-95"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

