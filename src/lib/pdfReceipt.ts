import jsPDF from 'jspdf'
import type { BookingData } from '@/pages/BookingConfirmation'
import { LOCATIONS, VEHICLE_TYPES, PAYMENT_METHODS } from '@/lib/bookingUtils'

/**
 * Format price for PDF (plain text without special characters)
 * @param price - Amount in Philippine Pesos
 * @returns Formatted string like "PHP 1,500" or "1,500.00"
 */
function formatPriceForPDF(price: number): string {
  return `PHP ${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

interface ServiceItem {
  id: string
  name: string
  price: number
  quantity: number
  duration?: number
  description?: string
  bookingDetails: {
    date: string
    timeSlot: string
    location: string
    vehicleType: string
  }
}

interface ProductItem {
  id: string
  name: string
  price: number
  quantity: number
  description?: string
}

/**
 * Generate and download a PDF receipt for a booking confirmation
 * @param bookingData - The booking confirmation data
 */
export function generateReceiptPDF(bookingData: BookingData): void {
  try {
    // Create new PDF document (A4 size: 210mm x 297mm)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - (margin * 2)
    let yPosition = margin

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredHeight: number) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
        return true
      }
      return false
    }

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, options: {
      fontSize?: number
      fontStyle?: 'normal' | 'bold' | 'italic'
      color?: [number, number, number]
      maxWidth?: number
      align?: 'left' | 'center' | 'right'
    } = {}) => {
      const {
        fontSize = 10,
        fontStyle = 'normal',
        color = [0, 0, 0],
        maxWidth = contentWidth,
        align = 'left'
      } = options

      doc.setFontSize(fontSize)
      doc.setFont('helvetica', fontStyle)
      doc.setTextColor(color[0], color[1], color[2])

      const lines = doc.splitTextToSize(text, maxWidth)
      doc.text(lines, x, y, { align })
      return lines.length * (fontSize * 0.35) // Return height used
    }

    // Header Section
    doc.setFillColor(19, 62, 135) // Brand primary color (RGB)
    doc.rect(margin, yPosition, contentWidth, 15, 'F')
    
    yPosition += 5
    addText('ESPINOSA\'S HAND CARWASH', pageWidth / 2, yPosition, {
      fontSize: 18,
      fontStyle: 'bold',
      color: [255, 255, 255],
      align: 'center'
    })
    
    yPosition += 6
    addText('Professional Car Wash Services', pageWidth / 2, yPosition, {
      fontSize: 10,
      color: [255, 255, 255],
      align: 'center'
    })

    yPosition += 15

    // Confirmation Code Section
    checkPageBreak(20)
    addText('BOOKING CONFIRMATION', pageWidth / 2, yPosition, {
      fontSize: 14,
      fontStyle: 'bold',
      align: 'center'
    })
    
    yPosition += 8
    doc.setFillColor(243, 243, 224) // Brand cream color
    doc.roundedRect(margin, yPosition - 5, contentWidth, 10, 2, 2, 'F')
    addText(`Confirmation Code: ${bookingData.confirmationCode}`, pageWidth / 2, yPosition + 2, {
      fontSize: 12,
      fontStyle: 'bold',
      color: [19, 62, 135],
      align: 'center'
    })
    
    yPosition += 15

    // Customer Information Section
    checkPageBreak(40)
    addText('CUSTOMER INFORMATION', margin, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: [19, 62, 135]
    })
    
    yPosition += 7
    addText(`Name: ${bookingData.customer.name}`, margin, yPosition, { fontSize: 10 })
    yPosition += 6
    addText(`Email: ${bookingData.customer.email}`, margin, yPosition, { fontSize: 10 })
    yPosition += 6
    addText(`Phone: ${bookingData.customer.phone}`, margin, yPosition, { fontSize: 10 })
    yPosition += 6
    
    const paymentMethod = PAYMENT_METHODS.find(p => p.value === bookingData.customer.paymentMethod)
    addText(`Payment Method: ${paymentMethod?.label || bookingData.customer.paymentMethod}`, margin, yPosition, { fontSize: 10 })
    
    yPosition += 10

    // Services Section
    if (bookingData.services && bookingData.services.length > 0) {
      checkPageBreak(30)
      addText('SERVICES BOOKED', margin, yPosition, {
        fontSize: 12,
        fontStyle: 'bold',
        color: [19, 62, 135]
      })
      
      yPosition += 7

      bookingData.services.forEach((service: ServiceItem, index: number) => {
        checkPageBreak(50)
        
        // Service header
        doc.setFillColor(240, 248, 255) // Light blue background
        doc.roundedRect(margin, yPosition - 3, contentWidth, 8, 2, 2, 'F')
        addText(`${index + 1}. ${service.name}`, margin + 2, yPosition + 2, {
          fontSize: 11,
          fontStyle: 'bold'
        })
        addText(formatPriceForPDF(service.price), pageWidth - margin - 2, yPosition + 2, {
          fontSize: 11,
          fontStyle: 'bold',
          align: 'right'
        })
        
        yPosition += 10

        // Service details
        if (service.description) {
          const descHeight = addText(`Description: ${service.description}`, margin + 5, yPosition, {
            fontSize: 9,
            maxWidth: contentWidth - 10,
            color: [100, 100, 100]
          })
          yPosition += descHeight + 3
        }

        // Booking details
        const locationDetails = LOCATIONS.find(l => l.id === service.bookingDetails.location)
        const vehicleType = VEHICLE_TYPES.find(t => t.value === service.bookingDetails.vehicleType)
        
        const bookingDate = new Date(service.bookingDetails.date)
        const formattedDate = bookingDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })

        addText(`Date: ${formattedDate}`, margin + 5, yPosition, { fontSize: 9 })
        yPosition += 5
        addText(`Time: ${service.bookingDetails.timeSlot}`, margin + 5, yPosition, { fontSize: 9 })
        yPosition += 5
        addText(`Location: ${locationDetails?.name || service.bookingDetails.location}`, margin + 5, yPosition, { fontSize: 9 })
        yPosition += 5
        if (service.bookingDetails.vehicleType) {
          addText(`Vehicle Type: ${vehicleType?.label || service.bookingDetails.vehicleType}`, margin + 5, yPosition, { fontSize: 9 })
          yPosition += 5
        }
        if (service.duration) {
          addText(`Duration: ${service.duration} minutes`, margin + 5, yPosition, { fontSize: 9 })
          yPosition += 5
        }

        yPosition += 5
      })
    }

    // Products Section
    if (bookingData.products && bookingData.products.length > 0) {
      checkPageBreak(30)
      addText('PRODUCTS PURCHASED', margin, yPosition, {
        fontSize: 12,
        fontStyle: 'bold',
        color: [19, 62, 135]
      })
      
      yPosition += 7

      bookingData.products.forEach((product: ProductItem, index: number) => {
        checkPageBreak(25)
        
        const productLine = `${index + 1}. ${product.name} x${product.quantity}`
        const productPrice = formatPriceForPDF(product.price * product.quantity)
        
        addText(productLine, margin + 2, yPosition, { fontSize: 10 })
        addText(productPrice, pageWidth - margin - 2, yPosition, {
          fontSize: 10,
          align: 'right'
        })
        
        yPosition += 5
        
        if (product.description) {
          const descHeight = addText(`   ${product.description}`, margin + 5, yPosition, {
            fontSize: 8,
            maxWidth: contentWidth - 10,
            color: [100, 100, 100]
          })
          yPosition += descHeight + 2
        }
        
        yPosition += 3
      })
    }

    // Order Summary Section
    checkPageBreak(40)
    yPosition += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    addText('ORDER SUMMARY', margin, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: [19, 62, 135]
    })
    
    yPosition += 7

    if (bookingData.services && bookingData.services.length > 0) {
      addText(`Services Subtotal:`, margin, yPosition, { fontSize: 10 })
      addText(formatPriceForPDF(bookingData.totals.servicesSubtotal), pageWidth - margin, yPosition, {
        fontSize: 10,
        align: 'right'
      })
      yPosition += 6
    }

    if (bookingData.products && bookingData.products.length > 0) {
      addText(`Products Subtotal:`, margin, yPosition, { fontSize: 10 })
      addText(formatPriceForPDF(bookingData.totals.productsSubtotal), pageWidth - margin, yPosition, {
        fontSize: 10,
        align: 'right'
      })
      yPosition += 6
    }

    addText(`Tax (12% VAT):`, margin, yPosition, { fontSize: 10 })
    addText(formatPriceForPDF(bookingData.totals.tax), pageWidth - margin, yPosition, {
      fontSize: 10,
      align: 'right'
    })
    yPosition += 8

    doc.setDrawColor(19, 62, 135)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    addText('TOTAL:', margin, yPosition, {
      fontSize: 14,
      fontStyle: 'bold',
      color: [19, 62, 135]
    })
    addText(formatPriceForPDF(bookingData.totals.total), pageWidth - margin, yPosition, {
      fontSize: 14,
      fontStyle: 'bold',
      color: [19, 62, 135],
      align: 'right'
    })

    yPosition += 15

    // Special Requests
    if (bookingData.customer.specialRequests) {
      checkPageBreak(20)
      addText('SPECIAL REQUESTS', margin, yPosition, {
        fontSize: 11,
        fontStyle: 'bold',
        color: [19, 62, 135]
      })
      yPosition += 6
      const requestsHeight = addText(bookingData.customer.specialRequests, margin, yPosition, {
        fontSize: 9,
        maxWidth: contentWidth,
        color: [100, 100, 100]
      })
      yPosition += requestsHeight + 10
    }

    // Footer Section
    checkPageBreak(30)
    yPosition += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    addText('IMPORTANT INFORMATION', margin, yPosition, {
      fontSize: 10,
      fontStyle: 'bold',
      color: [19, 62, 135]
    })
    
    yPosition += 6
    addText('• This is a demo booking - no actual service will be provided', margin, yPosition, { fontSize: 8 })
    yPosition += 5
    addText('• Please arrive 5 minutes before your scheduled time', margin, yPosition, { fontSize: 8 })
    yPosition += 5
    addText('• Bring your confirmation code for verification', margin, yPosition, { fontSize: 8 })
    yPosition += 5
    addText('• Payment is due upon arrival unless otherwise specified', margin, yPosition, { fontSize: 8 })
    yPosition += 5
    addText('• Contact us if you need to reschedule or cancel', margin, yPosition, { fontSize: 8 })
    
    yPosition += 10

    // Contact Information
    addText('CONTACT INFORMATION', margin, yPosition, {
      fontSize: 10,
      fontStyle: 'bold',
      color: [19, 62, 135]
    })
    
    yPosition += 6
    addText('Phone: +63 917 123 4567', margin, yPosition, { fontSize: 8 })
    yPosition += 5
    addText('Email: hello@espinosacarwash.com', margin, yPosition, { fontSize: 8 })
    yPosition += 5
    addText('Website: www.espinosacarwash.com', margin, yPosition, { fontSize: 8 })

    yPosition += 10

    // Order Date
    const orderDate = new Date(bookingData.createdAt)
    const formattedOrderDate = orderDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    addText(`Order Date: ${formattedOrderDate}`, margin, yPosition, {
      fontSize: 8,
      color: [150, 150, 150]
    })

    // Generate filename
    const filename = `Espinosa-Receipt-${bookingData.confirmationCode}.pdf`

    // Save the PDF
    doc.save(filename)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF receipt. Please try again.')
  }
}

