import { getOrganizer } from "@workspace/database/client/organizer";
import { createOrganizer } from "@workspace/database/client/organizer";
import { signInWithGoogle } from "@workspace/firebase/auth";
import { UserRole } from "@workspace/models/db/user";
import { NotFoundError } from "@workspace/utils/src/errors/database";
import { createSession } from "@/actions/auth-actions";

export const signInWithGoogleWithOrganizerProfile = async () => {
  try {
    const user = await signInWithGoogle();

    try {
      const organizer = await getOrganizer(user.uid);
      console.log("Organizer document already exists");
    } catch (error) {
      if (error instanceof NotFoundError) {
        console.log("Creating new organizer document");
        await createOrganizer({
          userId: user.uid,
          email: user.email || "",
          role: UserRole.ORGANIZER,
          profileImgUrl: user.photoURL || "",
        });
        console.log("Organizer document created successfully");
      }
    }
    const idToken = await user.getIdToken();
    await createSession(idToken);
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};
