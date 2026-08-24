export default function TreeLoading() {
  return (
    <div className="w-full px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
      <div className="mb-8 animate-pulse">
        <div className="bg-fg-disabled/20 mb-3 h-3 w-32 rounded" />
        <div className="bg-fg-disabled/20 h-10 w-64 rounded" />
        <div className="bg-fg-disabled/20 mt-3 h-4 w-96 rounded" />
      </div>
      <div className="border-border-faint bg-bg-near h-[600px] rounded-sm border" />
    </div>
  );
}
