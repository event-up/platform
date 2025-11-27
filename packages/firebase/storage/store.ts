import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads a given image file to Firebase Cloud Storage and retrieves its download URL.
 * @param file The image file (Blob or File) to upload.
 * @param path The path within the storage bucket where the file should be stored (e.g., 'images/profile_pics/user123.jpg').
 * @returns A Promise that resolves with the download URL of the uploaded image.
 */
async function uploadImageToFirebaseStorage(
  file: Blob | File,
  path: string
): Promise<string> {
  const storageRef = ref(storage, path);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}
