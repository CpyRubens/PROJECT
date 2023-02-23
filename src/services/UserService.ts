import { Api } from "helpers/endpoints/Api";
import { endpoint } from "helpers/endpoints";
import { User, UserResponse,UserUpdate } from "types/api/user";

export const UserService = {
  getLista: ():Promise<UserResponse[]> =>
    Api(endpoint.listUsers(), {
      method: "GET",
    }).then((response) => response.json()),

  create: (user: User) =>
    Api(endpoint.createUser(), {
      method: "POST",
      body: JSON.stringify(user),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  getById: (id: string) =>
    Api(endpoint.userById(id), {
      method: "GET",
    }).then((response) => response.json()),

  updateById: ({ user, id }: UserUpdate) =>
    Api(endpoint.userById(id), {
      method: "PATCH",
      body: JSON.stringify(user),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  deleteById: (id: string) =>
    Api(endpoint.userById(id), {
      method: "DELETE",
    }).then((response) => {
      return response.json()
    }),
};