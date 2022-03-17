import * as React from "react";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useSelector } from "react-redux";
import {StyledContainer} from "./style"

export default function AdminView() {
  const myUser = useSelector((state) => state.user);

  const [users, setUsers] = React.useState([]);

  const handleGrade = (type, userId) => {

    let isAdmin;
    type === "upgrade" ? isAdmin = true : isAdmin = false;

    return axios.put(`/api/users/admin/${userId}`, {isAdmin})
    .then(res => {
      let aux;
      aux = users.filter(user => user.id !== userId)
      aux.push(res.data)
      setUsers(aux.filter((user) => user.id !== myUser.id));
    })
  }

  React.useEffect(() => {
    return axios.get("/api/users/admin").then((res) => {
      setUsers(res.data.filter((user) => user.id !== myUser.id));
    });
  }, [myUser]);

  return (
    <StyledContainer>
      <h1 className="title">Users</h1>
      <div className="container">
        {users.length ? (
          users.map((user) => (
            <div key={user.id}>
              <div className="container__list">
                <div className="list__description">
                  <span className="description__name">Name: {user.name}</span>
                  <span className="description__email">Email: {user.email}</span>
                  <span>Type: {user.isAdmin? "Admin User" : "Common User"}</span>

                </div>
                <div className="list__actions">
                  <button onClick={()=>handleGrade("upgrade", user.id)} className="actions__upgrade btn">Upgrade</button>
                  <button onClick={()=>handleGrade("downgrade", user.id)} className="actions__downgrade btn">Downgrade</button>
                </div>
              </div>
              <Divider />
            </div>
          ))
        ) : (
          <h1>There are no users</h1>
        )}
      </div>
    </StyledContainer>
  );
}
