import { ImageAnnotatorClient } from '@google-cloud/vision';

export class AIService {
  private client = new ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });

  async generateDescription(imageBuffer: Buffer): Promise<string> {
    try {
      const [result] = await client.labelDetection(imageBuffer);
      return result.labelAnnotations?
        .map(label => label.description)
        .slice(0, 5)
        .join(', ') || 'No description generated';
    } catch (error) {
      throw new Error('AI description generation failed');
    }
  }
}
