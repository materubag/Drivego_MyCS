import React, { useEffect, useState } from "react";
import Modal_Ges from "./Registro_adm";
import EditUserModal from "./Edit_usu_adm";
import "../Styles/Gestion_Usuario.css";
import { BACK_URL } from "../config.js";

const Gestion_usuarios = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const handleSessionClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };
const handleDeleteClick=(user)=>{
  if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    fetch(BACK_URL+"/Borrar_Usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usu: user.id_usu }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
        
          setUsers((prevUsers) => 
            prevUsers.filter((user) => user.id_usu !== user)
          );
          alert(data.message);
          window.location.reload(); 
        } else {
          console.error("Error al eliminar:", data.message);
          alert("Error al eliminar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar el usuario");
      });
  }

};
  const handleSaveEdit = () => {
    fetch(BACK_URL+"/Editar_usuarios.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id_usu === editingUser.id_usu ? editingUser : user
            )
          );
          setEditingUser(null);
          alert(data.message)
        } else {
          console.error("Error al actualizar:", data.message);
        }
      })
      .catch((error) => console.error("Error en la actualización:", error));
  };

  useEffect(() => {
    fetch(BACK_URL+"/Ver_usuarios.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setUsers(data.users);
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-tit">Gestión de Usuarios</h2>
        <button className="btn-nu" onClick={handleSessionClick}>
          <i className="fa-solid fa-plus"></i>Nuevo Usuario
        </button>
      </div>
      <div className="card-conte">
        <table className="table-cont">
          <thead>
            <tr>
              <th className="table-head">Nombre</th>
              <th className="table-head">Apellido</th>
              <th className="table-head">Correo</th>
              <th className="table-head">Cargo</th>
              <th className="table-head">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usu}>
                <td className="table-cell">{user.nom_usu}</td>
                <td className="table-cell">{user.ape_usu}</td>
                <td className="table-cell">{user.corr_usu}</td>
                <td className="table-cell">{user.cargo}</td>
                <td className="table-cell">
                  <div className="btn-activs">
                    <button
                      className="btn-acti"
                      onClick={() => handleEditClick(user)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button className="btn-acti"
                    onClick={()=>handleDeleteClick(user)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          setUser={setEditingUser}
          onSave={handleSaveEdit}
          onCancel={() => setEditingUser(null)}
        />
      )}

      {showModal && <Modal_Ges closeModal={closeModal} />}
    </div>
  );
};

export default Gestion_usuarios;