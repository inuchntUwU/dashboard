const links = [
  { label: 'NotebookLM', icon: '/icons/notebooklm.png', url: 'https://notebooklm.google.com' },
  { label: 'Classroom', icon: '/icons/classroom.svg', url: 'https://classroom.google.com' },
  { label: 'Teams', icon: '/icons/teams.png', url: 'https://teams.microsoft.com' },
]

export default function QuickLinks() {
  return (
    <div className="flex justify-center gap-4 py-3">
      {links.map(l => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl
            bg-slate-800/60 hover:bg-slate-700/80 transition cursor-pointer
            text-white/60 hover:text-yellow-400 no-underline min-w-[84px]"
        >
          <img src={l.icon} alt="" className="w-8 h-8" />
          <span className="text-xs font-medium">{l.label}</span>
        </a>
      ))}
    </div>
  )
}