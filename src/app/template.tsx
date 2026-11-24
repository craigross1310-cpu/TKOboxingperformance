/** Re-mounts on navigation to give each page a subtle entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
