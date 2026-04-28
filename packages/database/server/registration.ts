"use server";

import {
  getEventRegistrationsByStatus,
  getRegistrationById,
} from "../registration/get.server";
import { createRegistrationServer } from "../registration/post.server";
import { updateRegistrationServer } from "../registration/put.server";

export {
  getEventRegistrationsByStatus,
  getRegistrationById,
  createRegistrationServer,
  updateRegistrationServer,
};
