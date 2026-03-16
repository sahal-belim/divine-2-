/**
 * WhatsApp Integration Utility
 * Generates WhatsApp URLs for messages and orders
 */

export interface WhatsAppOrderData {
  productName: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
  productId?: string;
}

/**
 * Generate a WhatsApp order message URL
 * @param data Order data
 * @param phoneNumber WhatsApp business number
 * @returns WhatsApp URL
 */
export function generateWhatsAppOrderUrl(
  data: WhatsAppOrderData,
  phoneNumber: string = "15550000000"
): string {
  const message = formatOrderMessage(data);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Generate a WhatsApp inquiry message URL
 * @param inquiry Inquiry text
 * @param phoneNumber WhatsApp business number
 * @returns WhatsApp URL
 */
export function generateWhatsAppInquiryUrl(
  inquiry: string,
  phoneNumber: string = "15550000000"
): string {
  const encodedMessage = encodeURIComponent(inquiry);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Format order data into a WhatsApp message
 * @param data Order data
 * @returns Formatted message string
 */
export function formatOrderMessage(data: WhatsAppOrderData): string {
  let message = `Hi, I'm interested in ordering the *${data.productName}*\n\n`;

  if (data.size) {
    message += `📏 Size: ${data.size}\n`;
  }

  if (data.color) {
    message += `🎨 Color: ${data.color}\n`;
  }

  message += `📦 Quantity: ${data.quantity}\n`;
  message += `💰 Total Price: $${(data.price * data.quantity).toFixed(2)}\n\n`;
  message += `Could you please help me with this order?`;

  return message;
}

/**
 * Create a shareable product link
 * @param productId Product ID
 * @param baseUrl Base URL of the website
 * @returns Shareable product URL
 */
export function createShareableProductUrl(
  productId: string,
  baseUrl: string = "https://divineclothing.com"
): string {
  return `${baseUrl}/product/${productId}`;
}
