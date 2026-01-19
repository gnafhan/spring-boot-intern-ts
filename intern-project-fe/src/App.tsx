// App with router configuration
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { StudentsPage } from '@/pages/StudentsPage';
import { CreateStudentPage } from '@/pages/CreateStudentPage';
import { StudentDetailPage } from '@/pages/StudentDetailPage';
import { EditStudentPage } from '@/pages/EditStudentPage';

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/students/create" element={<CreateStudentPage />} />
          <Route path="/students/:nomorInduk" element={<StudentDetailPage />} />
          <Route path="/students/:nomorInduk/edit" element={<EditStudentPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
