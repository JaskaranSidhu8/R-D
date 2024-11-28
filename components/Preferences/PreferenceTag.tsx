// components/static/PreferenceTag.tsx
interface PreferenceTagProps {
  text: string;
  onRemove: () => void;
}

const PreferenceTag = ({ text, onRemove }: PreferenceTagProps) => {
  return (
    <div className="flex items-center gap-1 px-4 py-1.5 rounded-full border border-primary text-primary">
      {text}
      <button 
        onClick={onRemove} 
        className="text-primary ml-1"
        aria-label={`Remove ${text}`}
      >
        ×
      </button>
    </div>
  );
};

export default PreferenceTag;