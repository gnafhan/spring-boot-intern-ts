# Student Management Frontend SPA

A modern, responsive Single Page Application for managing college students, built with React + TypeScript.

## Features

✅ **Full CRUD Operations**
- Create, read, update, and delete students
- Auto-generated unique student ID (Nomor Induk Mahasiswa)

✅ **Advanced UI Features**
- Paginated student list
- Real-time search by name
- Sortable columns
- Responsive design (mobile-friendly)
- Dark mode support

✅ **Form Validation**
- Client-side validation matching backend rules
- Age validation (17-40 years)
- Name format validation (letters, spaces, hyphens only)
- Real-time field validation feedback

✅ **User Experience**
- Loading states with spinners
- Toast notifications for success/error
- Confirmation dialogs for destructive actions
- Empty states with helpful messages
- Comprehensive error handling

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **TanStack Query v5** - Data fetching, caching, and state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI component library
- **date-fns** - Date manipulation
- **sonner** - Toast notifications
- **HugeIcons** - Icon library

## Prerequisites

- Node.js 18+ with npm
- Backend API running on http://localhost:8080/api

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

## Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/                    # API client and service methods
│   ├── client.ts          # Fetch wrapper with error handling
│   └── students.ts        # Student API endpoints
├── components/
│   ├── layout/            # Layout components
│   │   ├── AppLayout.tsx  # Main app layout with header
│   │   └── PageHeader.tsx # Page title and actions
│   ├── common/            # Reusable UI components
│   │   ├── Pagination.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorAlert.tsx
│   │   └── EmptyState.tsx
│   ├── students/          # Student-specific components
│   │   ├── StudentTable.tsx
│   │   ├── StudentForm.tsx
│   │   ├── StudentCard.tsx
│   │   ├── DeleteDialog.tsx
│   │   └── SearchBar.tsx
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
│   ├── useStudents.ts     # Fetch paginated students
│   ├── useStudent.ts      # Fetch single student
│   ├── useCreateStudent.ts
│   ├── useUpdateStudent.ts
│   ├── useDeleteStudent.ts
│   └── useSearchStudents.ts
├── pages/                 # Page components
│   ├── StudentsPage.tsx   # List view
│   ├── CreateStudentPage.tsx
│   ├── StudentDetailPage.tsx
│   └── EditStudentPage.tsx
├── types/                 # TypeScript type definitions
│   ├── student.ts         # Student interfaces
│   ├── api.ts            # API response types
│   └── form.ts           # Zod validation schemas
├── lib/                   # Utilities
│   ├── constants.ts       # App constants
│   ├── validators.ts      # Validation helpers
│   └── utils.ts          # General utilities
├── App.tsx               # Router configuration
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## Routes

- `/` - Student list (paginated, searchable, sortable)
- `/students/create` - Create new student
- `/students/:nomorInduk` - View student details
- `/students/:nomorInduk/edit` - Edit student

## API Integration

The app connects to the backend REST API:

- **Base URL**: `http://localhost:8080/api`
- **Endpoints**:
  - `GET /students` - List students (paginated)
  - `GET /students/{nomorInduk}` - Get student by ID
  - `POST /students` - Create student
  - `PUT /students/{nomorInduk}` - Update student
  - `DELETE /students/{nomorInduk}` - Delete student
  - `GET /students/search?keyword={term}` - Search students

## Form Validation Rules

### Nama Depan (First Name)
- Required
- 2-100 characters
- Only letters, spaces, and hyphens

### Nama Belakang (Last Name)
- Optional
- Max 100 characters
- Only letters, spaces, and hyphens

### Tanggal Lahir (Date of Birth)
- Required
- Must be a past date
- Age must be between 17-40 years

## State Management

- **Server State**: TanStack Query (React Query)
  - Automatic caching (30s stale time)
  - Query invalidation on mutations
  - Loading and error states
  - Retry logic

- **Local State**: React hooks (useState, useEffect)
  - Form state managed by React Hook Form
  - UI state (dialogs, pagination, search)

## Error Handling

- API errors displayed with user-friendly messages
- Validation errors shown inline in forms
- Network errors with retry capability
- 404 errors for missing students
- 409 conflicts for duplicate records
- Toast notifications for all operations

## Testing

See [TESTING-SUMMARY.md](./TESTING-SUMMARY.md) for detailed testing information.

### Manual Testing Checklist

1. ✅ View student list with pagination
2. ✅ Search students by name
3. ✅ Sort by clicking column headers
4. ✅ Create new student
5. ✅ View student details
6. ✅ Edit student information
7. ✅ Delete student (with confirmation)
8. ✅ Form validation (try invalid inputs)
9. ✅ Error handling (stop backend and try actions)
10. ✅ Responsive design (resize browser)

## Performance Optimizations

- Query result caching with TanStack Query
- Debounced search (500ms delay)
- Pagination for large datasets
- Code splitting with React Router
- Optimized re-renders with React Query

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in forms and dialogs
- Screen reader friendly error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **React Query Devtools** - Debug queries
- **Vite** - Fast HMR and build

## Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## Environment Variables

The app uses the following environment variable (optional):

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Default value is used if not set.

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new files
3. Add proper type definitions
4. Handle errors appropriately
5. Write accessible components
6. Test all CRUD operations

## License

This project is part of an internship assignment.

---

**Built with ❤️ using React + TypeScript**
