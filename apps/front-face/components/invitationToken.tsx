"use client";

import QRCodeSVG from "react-qr-code";

interface InvitationTokenProps {
  value?: string;
}

export default function InvitationToken({
  value = "https://example.com/invitation/token123",
}: InvitationTokenProps) {
  return (
    <div className="w-full flex items-center justify-center px-4 py-6">
      <div className="p-6 border-2 border-gray-800 rounded-lg bg-white shadow-lg">
        <QRCodeSVG
          value={value}
          size={200}
          style={{
            height: "auto",
            maxWidth: "100%",
            width: "100%",
          }}
          viewBox="0 0 200 200"
          level="M"
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
    </div>
  );
}