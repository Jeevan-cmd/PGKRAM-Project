import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 group-data-[collapsible=icon]:justify-center",
        className
      )}
      {...props}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12.22 2h-4.44l-2.65 9.29 5.3 5.3Z" />
          <path d="m22 12-4.14 4.14-5.3-5.3L16.27 2h-4.44" />
          <path d="M12.22 22h-4.44l-2.65-9.29 5.3-5.3Z" />
          <path d="m22 12-4.14-4.14-5.3 5.3L16.27 22h-4.44" />
        </svg>
      </div>
      <span className="font-headline text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        Punjab Hub
      </span>
    </div>
  );
}
