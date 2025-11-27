import axios, { AxiosInstance } from 'axios';

/**
 * Configuration for NotifyLk client
 */
export interface NotifyLkConfig {
  userId: string;
  apiKey: string;
  baseUrl?: string;
}

/**
 * Parameters for sending SMS
 */
export interface SendSMSParams {
  senderId: string;
  to: string;
  message: string;
  contactFname?: string;
  contactLname?: string;
  contactEmail?: string;
  contactAddress?: string;
  contactGroup?: string;
  type?: 'unicode';
}

/**
 * Response from sendSMS API
 */
export interface SendSMSResponse {
  status: 'success' | 'error';
  data: string;
  message?: string;
}

/**
 * Response from getAccountStatus API
 */
export interface AccountStatusResponse {
  status: 'success' | 'error';
  data: {
    active: boolean;
    acc_balance: number;
  };
  message?: string;
}

/**
 * NotifyLk SMS Client
 * 
 * This client provides methods to interact with the Notify.lk SMS API.
 * 
 * @example
 * ```typescript
 * const client = new NotifyLkClient({
 *   userId: 'your_user_id',
 *   apiKey: 'your_api_key'
 * });
 * 
 * // Send SMS
 * const result = await client.sendSMS({
 *   senderId: 'NotifyDEMO',
 *   to: '94712345678',
 *   message: 'Hello World'
 * });
 * 
 * // Get account status
 * const status = await client.getAccountStatus();
 * ```
 */
export class NotifyLkClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly userId: string;
  private readonly apiKey: string;

  constructor(config: NotifyLkConfig) {
    this.userId = config.userId;
    this.apiKey = config.apiKey;

    this.axiosInstance = axios.create({
      baseURL: config.baseUrl || 'https://app.notify.lk/api/v1',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Send SMS to a recipient
   * 
   * @param params - SMS parameters including senderId, recipient, and message
   * @returns Promise with the SMS send result
   * 
   * @example
   * ```typescript
   * const result = await client.sendSMS({
   *   senderId: 'NotifyDEMO', // Use 'NotifyDEMO' for testing
   *   to: '94712345678',       // Format: 9471XXXXXXX
   *   message: 'Test message'  // Max 621 chars
   * });
   * ```
   */
  async sendSMS(params: SendSMSParams): Promise<SendSMSResponse> {
    try {
      const requestParams = {
        user_id: this.userId,
        api_key: this.apiKey,
        sender_id: params.senderId,
        to: params.to,
        message: params.message,
        ...(params.contactFname && { contact_fname: params.contactFname }),
        ...(params.contactLname && { contact_lname: params.contactLname }),
        ...(params.contactEmail && { contact_email: params.contactEmail }),
        ...(params.contactAddress && { contact_address: params.contactAddress }),
        ...(params.contactGroup && { contact_group: params.contactGroup }),
        ...(params.type && { type: params.type }),
      };

      const response = await this.axiosInstance.post<SendSMSResponse>(
        '/send',
        null,
        { params: requestParams }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to send SMS: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Get account status and balance
   * 
   * @returns Promise with account status and balance information
   * 
   * @example
   * ```typescript
   * const status = await client.getAccountStatus();
   * console.log(`Active: ${status.data.active}`);
   * console.log(`Balance: ${status.data.acc_balance}`);
   * ```
   */
  async getAccountStatus(): Promise<AccountStatusResponse> {
    try {
      const response = await this.axiosInstance.get<AccountStatusResponse>(
        '/status',
        {
          params: {
            user_id: this.userId,
            api_key: this.apiKey,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get account status: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }
}

/**
 * Create a new NotifyLk client instance
 * 
 * @param config - Configuration with userId and apiKey
 * @returns NotifyLkClient instance
 */
export function createNotifyLkClient(config: NotifyLkConfig): NotifyLkClient {
  return new NotifyLkClient(config);
}
