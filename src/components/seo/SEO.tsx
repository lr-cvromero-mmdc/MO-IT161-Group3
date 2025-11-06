import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
}

export function SEO({
  title = "Espinosa's Hand Carwash - Where Cars Come to Shine",
  description = "Professional hand car washing and detailing services across Metro Manila, Cebu, Davao, and Iloilo. Family-owned since 2016. Book online today!",
  keywords = "car wash, hand car wash, car detailing, auto detailing, car cleaning, Manila car wash, Cebu car wash, professional car wash, mobile car wash",
  ogImage = "https://espinosacarwash.com/og-image.jpg",
  ogType = "website",
  canonical
}: SEOProps) {
  const siteUrl = "https://espinosacarwash.com"
  const fullTitle = title.includes("Espinosa") ? title : `${title} | Espinosa's Hand Carwash`
  const currentUrl = canonical || window.location.href

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Espinosa's Hand Carwash" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Espinosa's Hand Carwash" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="PH" />
      <meta name="geo.placename" content="Metro Manila, Philippines" />
      
      {/* Business/Organization */}
      <meta property="business:contact_data:street_address" content="Metro Manila" />
      <meta property="business:contact_data:locality" content="Manila" />
      <meta property="business:contact_data:region" content="Metro Manila" />
      <meta property="business:contact_data:postal_code" content="1000" />
      <meta property="business:contact_data:country_name" content="Philippines" />
      
      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoWash",
          "@id": `${siteUrl}/#organization`,
          name: "Espinosa's Hand Carwash",
          alternateName: "Espinosa Car Wash",
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          image: ogImage,
          description: description,
          telephone: "+63-917-123-4567",
          email: "hello@espinosacarwash.com",
          foundingDate: "2016",
          priceRange: "₱₱",
          paymentAccepted: ["Cash", "Credit Card", "Debit Card", "GCash", "PayMaya", "QR Ph"],
          currenciesAccepted: "PHP",
          areaServed: [
            {
              "@type": "City",
              name: "Metro Manila",
              addressCountry: "PH"
            },
            {
              "@type": "City", 
              name: "Cebu",
              addressCountry: "PH"
            },
            {
              "@type": "City",
              name: "Davao",
              addressCountry: "PH"
            },
            {
              "@type": "City",
              name: "Iloilo",
              addressCountry: "PH"
            }
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Car Wash Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Basic Wash",
                  description: "Exterior wash, wheel clean, dry & shine",
                  provider: {
                    "@type": "AutoWash",
                    name: "Espinosa's Hand Carwash"
                  }
                },
                price: "1500",
                priceCurrency: "PHP"
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Premium Wash",
                  description: "Basic wash plus interior vacuum, dashboard clean, tire shine",
                  provider: {
                    "@type": "AutoWash",
                    name: "Espinosa's Hand Carwash"
                  }
                },
                price: "2500",
                priceCurrency: "PHP"
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Full Detailing",
                  description: "Premium wash plus wax, leather conditioning, engine bay clean",
                  provider: {
                    "@type": "AutoWash",
                    name: "Espinosa's Hand Carwash"
                  }
                },
                price: "4500",
                priceCurrency: "PHP"
              }
            ]
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Manila",
            addressRegion: "Metro Manila",
            addressCountry: "PH"
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            opens: "07:00",
            closes: "19:00"
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "5000",
            bestRating: "5",
            worstRating: "1"
          },
          sameAs: [
            "https://www.facebook.com/espinosacarwash",
            "https://www.instagram.com/espinosacarwash",
            "https://twitter.com/espinosacarwash"
          ]
        })}
      </script>
      
      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl
            }
          ]
        })}
      </script>
    </Helmet>
  )
}


