module.exports = function (app, swig, Db) {
  app.get("/", async function (req, res) {
    let respuesta = swig.renderFile("views/home.html", {});
    res.send(respuesta);
  });
  app.get("/login", async function (req, res) {
    let respuesta = swig.renderFile("views/login.html", {});
    res.send(respuesta);
  });
  app.post("/login", async function (req, res) {
    let usuario = {}
    Db.checkUsuario(usuario, function (result) {
      if (result === null) {
        app.get("logger").error('Error en el login. Usuario: '+usuario)
        res.redirect("/login?mensaje=Usuario o contraseña incorrecto")
      }
      else{
        app.get("logger").info('Login con exito. Usuario: '+ usuario);
        req.session.usuario=usuario;
        res.redirect("/home");
      }
    })
  });
  app.get("/logout", async function (req, res) {
    let respuesta = swig.renderFile("views/logout.html", {});
    res.send(respuesta);
  });
  app.get("/register", async function (req, res) {
    let respuesta = swig.renderFile("views/register.html", {});
    res.send(respuesta);
  });
  app.post("/register", async function (req, res) {
    let usuario = {}
    Db.checkUsuario(usuario, function (result) {
      if (result === null) {
        app.get("logger").error('Error en el registro. Usuario: '+usuario)
        res.redirect("/register?mensaje=Usuario o contraseña incorrecto")
      }
      else{
        app.get("logger").info('Registro con exito. Usuario: '+ usuario);
        req.session.usuario=usuario;
        res.redirect("/home");
      }
    })
  });
}