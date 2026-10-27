import { lazy, Suspense } from 'react'
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
const LessonPage = lazy(() => import('./features/lessons/LessonPage.jsx'))
const ExamPage = lazy(() => import('./features/exams/ExamPage.jsx'))
const ExamResultPage = lazy(() => import('./features/exams/ExamResultPage.jsx'))
const CertificatesPage = lazy(() => import('./features/certificates/CertificatesPage.jsx'))
const VerifyCertificatePage = lazy(() => import('./features/certificates/VerifyCertificatePage.jsx'))
import HomePage from './features/home/HomePage.jsx'
import { TermsPage, PrivacyPage } from './features/auth/LegalPages.jsx'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SessionProvider>
        <Layout>
          <Suspense fallback={<p className="loading" role="status">Carregando...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            <Route
              path="/certificados"
              element={
                <RequireAuth>
                  <CertificatesPage />
                </RequireAuth>
              }
            />
            <Route path="/certificado/:code" element={<VerifyCertificatePage />} />
          </Routes>
          </Suspense>
        </Layout>
      </SessionProvider>
    </BrowserRouter>
  )
}
