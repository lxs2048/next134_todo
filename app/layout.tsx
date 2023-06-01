import './globals.css'
export const metadata = {
  title: 'Next',
  description: 'Next 13.4.4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
