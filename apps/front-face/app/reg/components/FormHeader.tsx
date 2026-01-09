interface FormHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function FormHeader({
  title,
  description,
  className = "",
}: FormHeaderProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
