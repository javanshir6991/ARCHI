import { RouterProvider } from 'react-router'
import { router } from './router.tsx'



const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App