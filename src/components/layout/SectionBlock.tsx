import type { SectionEntry } from '@/lib/data/sidebarSections';

export function SectionBlock({ data, isOnLight }: { data: SectionEntry; isOnLight: boolean }) {
  return (
    <>
      <h2
        className={`text-2xl font-bold leading-tight mb-3 transition-colors duration-500 ${
          isOnLight ? 'text-gray-900' : 'text-white'
        }`}
      >
        {data.heading}
      </h2>
      <p
        className={`text-xs leading-relaxed transition-colors duration-500 ${
          isOnLight ? 'text-gray-500' : 'text-gray-300'
        }`}
      >
        {data.description}
      </p>

      {data.quote && (
        <div className="mt-4 relative">
          <div
            className={`absolute left-0 top-0 bottom-0 w-px ${
              isOnLight ? 'bg-gray-300' : 'bg-indigo-500/40'
            }`}
          />
          <blockquote
            className={`pl-3 text-xs italic leading-relaxed ${
              isOnLight ? 'text-gray-600' : 'text-indigo-300/70'
            }`}
          >
            {data.quote}
          </blockquote>
          {data.quoteAuthor && (
            <p
              className={`pl-3 mt-1 text-[9px] uppercase tracking-wider ${
                isOnLight ? 'text-gray-400' : 'text-indigo-400/40'
              }`}
            >
              \u2014 {data.quoteAuthor}
            </p>
          )}
        </div>
      )}

      {data.details && (
        <div className="mt-4 space-y-2">
          {data.details.map((detail) => (
            <div key={detail.label} className="flex items-start gap-2">
              <span
                className={`text-[9px] font-bold uppercase tracking-wider w-16 flex-shrink-0 pt-px ${
                  isOnLight ? 'text-gray-400' : 'text-indigo-400/50'
                }`}
              >
                {detail.label}
              </span>
              <span
                className={`text-[11px] leading-snug ${
                  isOnLight ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-end mt-auto">
        <div
          className={`text-[10px] transition-colors duration-500 ${
            isOnLight ? 'text-gray-400' : 'text-gray-300'
          }`}
        >
          {data.tag}
        </div>
        <div
          className={`text-xs font-mono transition-colors duration-500 ${
            isOnLight ? 'text-gray-400' : 'text-gray-300'
          }`}
        >
          {data.code}
        </div>
      </div>
    </>
  );
}
