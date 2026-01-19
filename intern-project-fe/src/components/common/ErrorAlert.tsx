// Error alert component
interface ErrorAlertProps {
  title?: string;
  message: string;
  errors?: string[];
}

export function ErrorAlert({ title = 'Error', message, errors }: ErrorAlertProps) {
  return (
    <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
      <div className="flex gap-3">
        <span className="text-destructive text-xl flex-shrink-0">⚠️</span>
        <div className="flex-1">
          <h3 className="font-semibold text-destructive mb-1">{title}</h3>
          <p className="text-sm text-destructive/90">{message}</p>
          {errors && errors.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-sm text-destructive/80 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
