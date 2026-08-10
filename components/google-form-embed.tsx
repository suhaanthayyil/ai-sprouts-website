type GoogleFormEmbedProps = {
  formId: string;
  title: string;
  height: number;
};

export function GoogleFormEmbed({ formId, title, height }: GoogleFormEmbedProps) {
  const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;

  return (
    <div className="google-form-shell">
      <iframe
        className="google-form-frame"
        src={`${formUrl}?embedded=true`}
        title={title}
        height={height}
        loading="lazy"
      >
        Loading…
      </iframe>
      <p className="google-form-fallback">Having trouble viewing the form? <a href={formUrl} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
    </div>
  );
}
