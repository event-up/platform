'use server'

import { env } from '../env';
import { createHmac, timingSafeEqual } from 'crypto'



/**
 * Generates a secure token for a registration.
 * @param registrationId 
 * @param eventId 
 * @param organizerId 
 * @returns 
 */
export const generateRegistrationToken = (
  registrationId: string,
  eventId: string,
  organizerId: string
) => {


  const jsonPayload = {
    e: eventId,
    r: registrationId,
  }
  const payload = JSON.stringify(jsonPayload);
  const payloadBase64 = Buffer.from(payload).toString("base64url");

  const signature = createHmac("sha256", env.CHECKIN_TOKEN_SECRET).update(payloadBase64).digest("base64url");

  const token = `${payloadBase64}.${signature}`

  return token;
};



/**
 * Verify the token
*/
export const verifyRegistrationToken = async (token: string): Promise<{ isValid: boolean, eventId: string | null, registrationId: string | null }> => {
  const [payloadBase64, signature] = token.split(".");

  if (!payloadBase64 || !signature) {
    console.log("Invalid Token , missing payload or signature")
    return { isValid: false, eventId: null, registrationId: null };
  }

  const expectedSignature = createHmac("sha256", env.CHECKIN_TOKEN_SECRET).update(payloadBase64).digest("base64url");

  const isVaid = timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))

  if (!isVaid) {
    return { isValid: false, eventId: null, registrationId: null };
  }


  const payloadString = Buffer.from(payloadBase64, "base64url").toString();
  const paylaod = JSON.parse(payloadString);


  return {
    isValid: true,
    eventId: paylaod.e,
    registrationId: paylaod.r,
  }

}
