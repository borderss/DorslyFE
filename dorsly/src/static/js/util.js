let api = "http://127.0.0.1:5173/api"

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

const loginUser = (email, password) => {
  if (!userExists()) {
    apiMethod("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((data) => {
      setLS("user", data)
      location.reload()
      return data
    })
  } else {
    console.warn("Logging in with a user token")
    return null
  }
}

const registerUser = (name, email, password) => {
  if (!userExists()) {
    apiMethod("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((data) => {
      location.reload()
      return data
    })
  } else {
    console.warn("Registering with a user token")
    return null
  }
}

const logoutUser = () => {
  if (userExists()) {
    apiMethod("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((data) => {
      removeLS("user")
      location.reload()
      return data
    })
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

const examplePost = (var1, var2) => {
  if (userExists()) {
    apiMethod("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        param1: var1,
        param2: var2,
      }),
    }).then(() => {
      location.reload()
    })
  } else {
    console.warn("Invalid data")
    return null
  }
}

export {
  apiMethod,
  setLS,
  getLS,
  removeLS,
  getUser,
  getToken,
  loginUser,
  registerUser,
  logoutUser,
  userExists,
  examplePost,
}