x = 100;

const funcion = (valor) => {
    console.log("parametro",valor);
    console.log(this.x);
}

entorno = {
    x: 5,
    fun : funcion.bind(x)
}

var result = entorno.fun();

var other = funcion(7);