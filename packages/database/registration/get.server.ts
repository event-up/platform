"use server";
import {
  ParticipantStatus,
  Registration,
} from "@workspace/models/db/registration";
import { serverDb as db } from "@workspace/firebase/server";
import {
} from "@workspace/const/database";
import { REGISTRATION_COLLECTION } from "@workspace/const/database";
import { firestorePaths } from "../paths";

export async function getEventRegistrationsByStatus(
  organizerId: string,
  eventId: string,
  status?: ParticipantStatus,
) {
  const collectionRef = db
    .collection(firestorePaths.registrationsCollection(organizerId, eventId).join("/"));

  const query = status
    ? collectionRef.where("status", "==", status)
    : collectionRef;
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data() as Registration);
}

export async function getRegistrationById(registrationId: string) {
  const collectionRef = db
    .collectionGroup(REGISTRATION_COLLECTION)
    .where("registrationId", "==", registrationId)
    .limit(1);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  if (!doc) return null;

  return doc.data() as Registration;
}

