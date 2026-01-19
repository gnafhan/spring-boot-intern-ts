// Pagination component
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  totalItems?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  totalItems,
}: PaginationProps) {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        {totalItems !== undefined && (
          <span>
            Total: <span className="font-medium">{totalItems}</span> students
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
        >
          <span>← Previous</span>
        </Button>
        
        {startPage > 0 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(0)}
            >
              1
            </Button>
            {startPage > 1 && <span className="text-muted-foreground">...</span>}
          </>
        )}
        
        {pageNumbers.map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum + 1}
          </Button>
        ))}
        
        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && <span className="text-muted-foreground">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages - 1)}
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          <span>Next →</span>
        </Button>
      </div>
    </div>
  );
}
