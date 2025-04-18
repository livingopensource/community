import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isSubscriptionValid(issuanceDate: string) {
  const issuedDate = new Date(issuanceDate);
  const expirationDate = new Date(issuedDate);
  expirationDate.setFullYear(issuedDate.getFullYear() + 1);

  const now = new Date();
  return now <= expirationDate;
}

export async function generateCertificate() {
  // Create a new PDF Document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage([600, 400]);

  // Define fonts and colors
  const fontSize = 24;
  const textColor = rgb(0, 0, 0); // Black

  // Add Foundation Logo (if available)
  const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png'; // Tux Logo as an example
  const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoDims = logoImage.scale(0.2); // Scale down the logo

  page.drawImage(logoImage, {
    x: page.getWidth() / 2 - logoDims.width / 2,
    y: page.getHeight() - logoDims.height - 20,
    width: logoDims.width,
    height: logoDims.height,
  });

  // Add Certificate Title
  page.drawText('Certificate of Membership', {
    x: 150,
    y: 300,
    size: fontSize,
    color: textColor,
  });

  // Add Member Name
  const memberName = 'John Doe'; // Replace with actual member name
  page.drawText(`Presented to: ${memberName}`, {
    x: 150,
    y: 250,
    size: fontSize - 4,
    color: textColor,
  });

  // Add Subscription Details
  const subscriptionDetails = 'Valid from: 2024-01-01 to 2024-12-31';
  page.drawText(subscriptionDetails, {
    x: 150,
    y: 200,
    size: fontSize - 6,
    color: textColor,
  });

  // Add Footer
  page.drawText('Thank you for supporting our Linux-based foundation!', {
    x: 80,
    y: 100,
    size: fontSize - 8,
    color: textColor,
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();

  // Download the PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Membership_Certificate.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function showLOSFPdf(url: string) {
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { height } = firstPage.getSize()
  firstPage.drawText('Living Open Source Foundation', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
/* 
export async function renderPDF(pdfBytes: Uint8Array) {
  // Create a Blob from the PDF bytes
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Load PDF using PDF.js
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js';

  const pdf = await pdfjsLib.getDocument(url).promise;

  // Render the first page
  const page = await pdf.getPage(1);
  const canvas = document.getElementById('pdf-canvas');
  const context = canvas.getContext('2d');

  // Set scale and viewport
  const viewport = page.getViewport({ scale: 1.5 });
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // Render the page on the canvas
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  await page.render(renderContext);
} */