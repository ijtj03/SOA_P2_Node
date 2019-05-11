const db = require("./db");

let orden = {};

orden.getOrdenes = function getOrdenes() {
  return new Promise(resolve => {
    db.query(
      "SELECT o.id AS id, o.usuario AS usuario, o.fecha AS fecha FROM ordenes o",
      (err, res) => {
        let result_return = [];
        res.forEach(async element => {
          const { id } = element;
          const productos = orden.getProductoxOrden(id);
          element["productos"] = productos;
          result_return.push(element);
        });
        resolve(result_return);
      }
    );
  });
};

orden.getOrden = function getOrden(id) {
  return new Promise(resolve => {
    db.query(
      "SELECT o.id AS id, o.usuario AS usuario, o.fecha AS fecha " +
        "FROM ordenes o WHERE o.id = " +
        id,
      (err, res) => {
        try {
          const { id } = res[0];
          const productos = orden.getProductoxOrden(id);
          res[0]["productos"] = productos;
          resolve(res[0]);
        } catch {
          resolve({});
        }
      }
    );
  });
};

orden.getProductoxOrden = function getProductoxOrden(id) {
  return new Promise(resolve => {
    db.query(
      "SELECT p.id_producto AS codigo, p.precio AS precio, p.cantidad AS cantidad " +
        "FROM productosxorden AS p WHERE p.id_orden = " +
        id,
      (err, res) => {
        resolve(res);
      }
    );
  });
};
orden.insertarOrden = function insertarOrden(order) {
  return new Promise(resolve => {
    db.query("INSERT INTO ordenes SET ?", order, (err, res) => {
      resolve(res);
    });
  });
};

orden.insertarProducto = function insertarProducto(id, product) {
  return new Promise(resolve => {
    db.query(
      "INSERT INTO productosxorden SET `id_orden` = " + id + ", ?",
      product,
      (err, res) => {
        resolve(res);
      }
    );
  });
};

orden.actualizarOrden = function actualizarOrden(id, order) {
  return new Promise(resolve => {
    db.query("UPDATE ordenes SET ? WHERE id = " + id, order, (err, res) => {
      resolve(res);
    });
  });
};

orden.actualizarProducto = function actualizarProducto(id, product) {
  return new Promise(resolve => {
    db.query(
      "UPDATE productosxorden SET ? WHERE id_orden = " +
        id +
        " AND id_producto = '" +
        product.id_product +
        "'",
      product,
      (err, res) => {
        const { affectedRows } = res;
        if (affectedRows >= 1) {
          resolve(res);
        } else {
          resolve(orden.insertarProducto(id, product));
        }
      }
    );
  });
};

orden.borrarOrden = function borrarOrden(id) {
  return new Promise(resolve => {
    db.query("DELETE FROM ordenes WHERE id = " + id, (err, res) => {
      resolve(res);
    });
  });
};

orden.borrarProductos = function borrarProductos(id) {
  return new Promise(resolve => {
    db.query(
      "DELETE FROM productosxorden WHERE id_orden = " + id,
      (err, res) => {
        resolve(res);
      }
    );
  });
};

orden.borrarProducto = function borrarProducto(code, order) {
  return new Promise(resolve => {
    db.query(
      "DELETE FROM productosxorden WHERE id_producto = '" +
        code +
        "' AND id_orden = " +
        order,
      (err, res) => {
        console.log(err);
        resolve(res);
      }
    );
  });
};

module.exports = orden;
