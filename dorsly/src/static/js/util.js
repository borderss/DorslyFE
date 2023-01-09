const api = "http://127.0.0.1:8000/api"

const defaultHeaders = {
  "Content-Type": "application/json",
  accept: "*/*",
}

const bearerHeaders = () => {
  return {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${getToken()}`,
  }
}

const apiMethod = async (endpoint = "", requestParams) => {
  const response = await fetch(api + endpoint, requestParams)
  const data = await response.json()

  return data
}

const setLS = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getLS = (key) => {
  let value = window.localStorage.getItem(key)

  return value != undefined ? JSON.parse(value) : null
}

const removeLS = (key) => {
  window.localStorage.removeItem(key)
}

const getUser = () => {
  return getLS("user") != undefined ? getLS("user") : null
}

const getToken = () => {
  let user = getLS("user")

  if (user) {
    return user.access_token
  }
}

const loginUser = async (props) => {
  if (!userExists()) {
    return apiMethod("/login", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({
        email: props.email,
        password: props.password,
      }),
    })
      .then((data) => {
        setLS("user", data)
        return data
      })
      .catch((error) => error)
  } else {
    console.warn("Logging in with a user token")
    return null
  }
}

const registerUser = async (props) => {
  if (!userExists() && props.password == props.passwordConfirm) {
    return apiMethod("/register", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({
        first_name: props.firstName,
        last_name: props.lastName,
        email: props.email,
        phone_number: props.phoneNumber,
        password: props.password,
      }),
    })
      .then((data) => {
        window.location.href = "/login"
        return data
      })
      .catch((error) => error)
  } else {
    console.warn("Registering with a user token")
    return null
  }
}

const logoutUser = () => {
  if (userExists()) {
    return apiMethod("/logout", {
      method: "GET",
      headers: bearerHeaders(),
    })
      .then((data) => {
        removeLS("user")
        location.reload()
        return data
      })
      .catch((error) => error)
  } else {
    console.warn("logging out without an user existing")
    return null
  }
}

const userExists = () => {
  let user = getUser()
  if (user) {
    return true
  } else {
    return false
  }
}

export {
  apiMethod,
  bearerHeaders,
  setLS,
  getLS,
  removeLS,
  getUser,
  getToken,
  loginUser,
  registerUser,
  logoutUser,
  userExists,
}
