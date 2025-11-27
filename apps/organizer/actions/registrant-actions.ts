"use server";

import { Registration } from "@workspace/models/db/registration";
import { createRegistration } from "@workspace/database/registration/post";
const createNewRegistration = async (data: Registration) => {
  const res = await createRegistration({
    ...data,
  });
};
