import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/features/Users/UsersSlice";
const Users = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.users);
  const usersError = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (usersState) {
    return <p>Loading...</p>;
  }

  if (usersError) {
    return <p>{usersError}</p>;
  }

  return (
    <div>
      {users.length &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Users;
