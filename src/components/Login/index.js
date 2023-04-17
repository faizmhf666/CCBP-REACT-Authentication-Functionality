import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')

  const onSubmitSuccess = token => {
    const {history} = props

    Cookies.set('jwt_token', token, {
      expires: 30,
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    console.log(errorMsg)
  }

  const onLogin = async () => {
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(fetchedData.jwt_token)
    } else {
      onSubmitFailure(fetchedData.error_msg)
    }
  }

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <>
      <h1>Please Login</h1>
      <button type="button" onClick={onLogin}>
        Login with Sample Creds
      </button>
    </>
  )
}
export default Login
