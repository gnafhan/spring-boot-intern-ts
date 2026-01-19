package com.xtramile.intern_project.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "Paginated API response")
public class PagedResponse<T> {
    
    @Schema(description = "Response status", example = "success")
    private String status;
    
    @Schema(description = "Response message", example = "Data retrieved successfully")
    private String message;
    
    @Schema(description = "List of items")
    private List<T> data;
    
    @Schema(description = "Pagination metadata")
    private PaginationMeta meta;
    
    @Schema(description = "Response timestamp")
    private LocalDateTime timestamp;
    
    // Inner class for pagination metadata
    @Schema(description = "Pagination information")
    public static class PaginationMeta {
        @Schema(description = "Current page number (0-based)", example = "0")
        private int currentPage;
        
        @Schema(description = "Number of items per page", example = "10")
        private int pageSize;
        
        @Schema(description = "Total number of items", example = "100")
        private long totalItems;
        
        @Schema(description = "Total number of pages", example = "10")
        private int totalPages;
        
        @Schema(description = "Has next page", example = "true")
        private boolean hasNext;
        
        @Schema(description = "Has previous page", example = "false")
        private boolean hasPrevious;
        
        public PaginationMeta() {}
        
        public PaginationMeta(int currentPage, int pageSize, long totalItems, int totalPages, boolean hasNext, boolean hasPrevious) {
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            this.totalItems = totalItems;
            this.totalPages = totalPages;
            this.hasNext = hasNext;
            this.hasPrevious = hasPrevious;
        }
        
        // Getters and Setters
        public int getCurrentPage() { return currentPage; }
        public void setCurrentPage(int currentPage) { this.currentPage = currentPage; }
        
        public int getPageSize() { return pageSize; }
        public void setPageSize(int pageSize) { this.pageSize = pageSize; }
        
        public long getTotalItems() { return totalItems; }
        public void setTotalItems(long totalItems) { this.totalItems = totalItems; }
        
        public int getTotalPages() { return totalPages; }
        public void setTotalPages(int totalPages) { this.totalPages = totalPages; }
        
        public boolean isHasNext() { return hasNext; }
        public void setHasNext(boolean hasNext) { this.hasNext = hasNext; }
        
        public boolean isHasPrevious() { return hasPrevious; }
        public void setHasPrevious(boolean hasPrevious) { this.hasPrevious = hasPrevious; }
    }
    
    // Constructors
    public PagedResponse() {
        this.timestamp = LocalDateTime.now();
    }
    
    public PagedResponse(String status, String message, List<T> data, PaginationMeta meta) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.meta = meta;
        this.timestamp = LocalDateTime.now();
    }
    
    // Static factory method
    public static <T> PagedResponse<T> success(String message, List<T> data, int currentPage, int pageSize, long totalItems, int totalPages, boolean hasNext, boolean hasPrevious) {
        PaginationMeta meta = new PaginationMeta(currentPage, pageSize, totalItems, totalPages, hasNext, hasPrevious);
        return new PagedResponse<>("success", message, data, meta);
    }
    
    // Getters and Setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public List<T> getData() { return data; }
    public void setData(List<T> data) { this.data = data; }
    
    public PaginationMeta getMeta() { return meta; }
    public void setMeta(PaginationMeta meta) { this.meta = meta; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
