import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Empty } from "antd";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/toast.config";

type User = {
  id: number;
  name: string;
  citizenshipNumber: string;
  email: string;
};

const Users = () => {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("/users/all")
      .then((res) => setUser(res.data.users))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const verifyUser = (id: number | string) => {
    axios
      .post("/users/verify", { userId: id })
      .then((res) => {
        removeUserFromList(id);
        toast.success("User verified.", toastConfig);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const deleteUser = (id: number | string) => {
    axios
      .delete(`/users/delete/${id}`)
      .then((res) => {
        removeUserFromList(id);
        toast.info("User deleted.", toastConfig);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const removeUserFromList = (id: number | string) => {
    const index = users.findIndex((user) => user.id === id);
    const newList = [...users];
    newList.splice(index, 1);
    setUser(newList);
  };

  if (users.length === 0)
    return (
      <div className="empty-container">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={"No users to verify"}
        />
      </div>
    );

  return (
    <div className="users-wrapper">
      {users.map((user, index) => (
        <div key={index} className="user-wrapper">
          <div className="verify-icon-container">
            <div className="verify-icon">
              <i className="bi bi-person-circle"></i>
            </div>
            {user.name}
          </div>

          <div style={{ marginRight: "10px" }}>
            <p>
              Citizenship number:{" "}
              <span style={{ color: "green" }}>{user.citizenshipNumber}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            {/* Hello World <button
              onClick={() => verifyUser(user.id)}
              className="button-primary"
            >
              verify
      </button>*/}

            <button
              onClick={() => deleteUser(user.id)}
              className="button-black"
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
