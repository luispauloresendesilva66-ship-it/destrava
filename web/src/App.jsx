import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import SignupPage from './features/auth/SignupPage.jsx'
import LoginPage from './features/auth/LoginPage.jsx'
import ForgotPasswordPage from './features/auth/ForgotPasswordPage.jsx'
import NewPasswordPage from './features/auth/NewPasswordPage.jsx'
import RequireAuth from './features/auth/RequireAuth.jsx'
import { SessionProvider } from './features/auth/SessionProvider.jsx'
import DashboardPage from './features/levels/DashboardPage.jsx'
import LevelMapPage from './features/levels/LevelMapPage.jsx'
import LessonPage from './features/lessons/LessonPage.jsx'
import ExamPage from './features/exams/ExamPage.jsx'
import ExamResultPage from './features/exams/ExamResultPage.jsx'
import { TermsPage, PrivacyPage } from './features/auth/LegalPages.jsx'

function Home() {
  return <h1>Bem-vindo ao Destrava</h1>
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SessionProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<SignupPage />} />
            <Route path="/entrar" element={<LoginPage />} />
            <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
            <Route path="/nova-senha" element={<NewPasswordPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route
              path="/painel"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            />
            <Route
              path="/niveis"
              element={
                <RequireAuth>
                  <LevelMapPage />
                </RequireAuth>
              }
            />
            <Route
              path="/aula/:lessonId"
              element={
                <RequireAuth>
                  <LessonPage />
                </RequireAuth>
              }
            />
            <Route
              path="/prova/:levelId"
              element={
                <RequireAuth>
                  <ExamPage />
                </RequireAuth>
              }
            />
            <Route
              path="/prova/:levelId/resultado"
              element={
                <RequireAuth>
                  <ExamResultPage />
                </RequireAuth>
              }
            />
          </Routes>
        </Layout>
      </SessionProvider>
    </BrowserRouter>
  )
}
