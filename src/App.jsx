import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
