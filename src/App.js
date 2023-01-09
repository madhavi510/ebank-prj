import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
