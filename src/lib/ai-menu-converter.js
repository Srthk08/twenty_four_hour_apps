// AI Menu Converter
// This module handles the conversion of menu photos to text using AI

export class AIMenuConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1';
  }

  // Convert image to text using ChatGPT Vision API
  async convertImageToText(imageUrl, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Please extract all text from this menu image. Include:
                  - All menu items and their descriptions
                  - Prices for each item
                  - Categories/sections
                  - Special offers or promotions
                  - Restaurant name and contact information
                  - Any other relevant text
                  
                  Format the output in a clear, structured way that can be easily edited and used for a digital menu system.`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageUrl,
                    detail: 'high'
                  }
                }
              ]
            }
          ],
          max_tokens: 2000,
          temperature: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response from AI API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI conversion error:', error);
      throw new Error(`Failed to convert image to text: ${error.message}`);
    }
  }

  // Convert image to text using alternative method (if ChatGPT is not available)
  async convertImageToTextAlternative(imageUrl) {
    // This is a placeholder for alternative AI services
    // You could integrate with Google Vision API, AWS Textract, etc.
    
    return `Alternative AI Conversion Result:
    
    This is a placeholder for alternative AI conversion methods.
    In a real implementation, you would integrate with:
    - Google Cloud Vision API
    - AWS Textract
    - Azure Computer Vision
    - Or other OCR/AI services
    
    The result would be the actual text extracted from the menu image.`;
  }

  // Validate image before processing
  validateImage(imageUrl) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const url = new URL(imageUrl);
    const extension = url.pathname.toLowerCase().substring(url.pathname.lastIndexOf('.'));
    
    if (!allowedExtensions.includes(extension)) {
      throw new Error('Invalid image format. Please use JPG, PNG, GIF, or WEBP.');
    }
    
    return true;
  }

  // Process menu image with error handling
  async processMenuImage(imageUrl, options = {}) {
    try {
      // Validate image
      this.validateImage(imageUrl);
      
      // Convert to text
      const convertedText = await this.convertImageToText(imageUrl, options);
      
      return {
        success: true,
        text: convertedText,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Menu processing error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Default export
export default AIMenuConverter;
