export const metadata = {
  title: 'Sanity Studio',
  description: 'Content management for Priyanka Portfolio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: '100vh' }}>
      {children}
    </div>
  )
}
