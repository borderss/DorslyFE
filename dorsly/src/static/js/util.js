var api = "http://127.0.0.1:8000/api"

if (import.meta.env.MODE = "production") {
  api = "https://api.dorsly.com/api"
}

const defaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  }
}

const bearerHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  }
}

const apiMethod = async (endpoint = "", requestParams) => {
  const response = await fetch(api + endpoint, requestParams)
  const data = await response.json()

  return data
}

const loginUser = async (loginData, user, token, setUser, setToken) => {
  if (user == null && token == null ) {
    return apiMethod("/login", {
      method: "POST",
      headers: defaultHeaders(),
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    })
      .then((data) => {
        setUser(data.user) 
        setToken(data.token)

        return data
      })
      .catch((error) => error)
  } else {
    console.warn("Logging in with a user token")
    return null
  }
}

const registerUser = async (registerData, user, token, setUser, setToken) => {
  if (user == null && token == null && registerData.password == registerData.passwordConfirm) {
    return apiMethod("/register", {
      method: "POST",
      headers: defaultHeaders(),
      body: JSON.stringify({
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        email: registerData.email,
        phone_number: registerData.phoneNumber,
        password: registerData.password,
      }),
    })
      .then((data) => {
        setUser(data.user) 
        setToken(data.token)
        return data
      })
      .catch((error) => error)
  } else {
    console.warn("Registering with a user token")
    return null
  }
}

const logoutUser = (user, token, setUser, setToken) => {
  if (user && token) {
    return apiMethod("/logout", {
      method: "GET",
      headers: bearerHeaders(token),
    })
      .then((data) => {
        window.localStorage.removeItem("access_token")
        setUser(null)
        setToken(null)
        window.location.href = "/"
        return data
      })
      .catch((error) => error)
  } else {
    console.warn("logging out without an user existing")
    return null
  }
}

export {
  apiMethod,
  defaultHeaders,
  bearerHeaders,
  loginUser,
  registerUser,
  logoutUser,
}