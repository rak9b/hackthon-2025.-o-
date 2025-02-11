import twilio from 'twilio';

export class OTPService {
  private client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  async sendOTP(phoneNumber: string): Promise<void> {
    try {
      await this.client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' });
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }

  async verifyOTP(phoneNumber: string, code: string): Promise<boolean> {
    try {
      const result = await this.client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks
        .create({ to: phoneNumber, code });
      return result.status === 'approved';
    } catch (error) {
      return false;
    }
  }
}
