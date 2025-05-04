import React from "react";
import "..//Styles/Edit_usu_adm.css";

const Edit_usu_adm = ({ user, onSave, onCancel, setUser }) => {
  if (!user) return null;
  return (
    <div className="modal_edit_user">
      <div className="modal_cont">
        <h3>Editar Usuario</h3>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              value={user.nom_usu}
              onChange={(e) => setUser({ ...user, nom_usu: e.target.value })}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              value={user.ape_usu}
              onChange={(e) => setUser({ ...user, ape_usu: e.target.value })}
            />
          </label>
          <label>
            Correo:
            <input
              type="text"
              value={user.corr_usu}
              onChange={(e) => setUser({ ...user, corr_usu: e.target.value })}
            />
          </label>
          <label>
            Cargo:
            <select
              value={user.cargo}
              onChange={(e) => setUser({ ...user, cargo: e.target.value })}
            >
              <option value="Administrador">Administrador</option>
              <option value="Cliente">Cliente</option>
              <option value="Usuario">Usuario</option>
            </select>
          </label>
        </form>
        <div className="button-group">
          <button onClick={onSave} className="save-button">Guardar Cambios</button>
          <button onClick={onCancel} className="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Edit_usu_adm;