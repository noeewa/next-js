import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={`border-2 border-dashed ${className}`}>
      <CardContent className="p-12 text-center">
        {Icon && (
          <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        )}
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6">
          {description}
        </p>
        {action && (
          <Link href={action.href}>
            <Button>{action.label}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
