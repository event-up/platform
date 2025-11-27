import QRCode from "qrcode";

export const generateQRCode = async (data: string): Promise<string> => {
  const qr = await QRCode.toDataURL(data);
  return qr;
};
