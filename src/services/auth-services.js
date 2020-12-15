import {http} from './http'

export const login = ({email, password}) => {
  return http.post('./login', {
    email,
    password,
  })
}
