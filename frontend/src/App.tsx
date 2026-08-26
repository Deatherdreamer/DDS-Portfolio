import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()

  return (
    <main>
      <h1>{t('app.title')}</h1>
    </main>
  )
}

export default App