export const getters = {
    /*//? =========================================================================================== */
    /*//? PROFESIONES */
    totaldeRegistros: (state) => {
        return state.st_profesiones.length
    }, //* (state)
    filtrarRegistros: (state) => 
        (token) => {
            return state.st_profesiones.filter( (dummy,index) => {
                if (state.st_profesiones[index]
                        .descripcion.toUpperCase()
                        .includes( token.buscar.toUpperCase() )
                    ) {

                        return state.st_profesiones[index].descripcion
                    }
            }) //* return
        }, //* (token)

    /*//? =========================================================================================== */
    /*//? PUESTOS */
    totaldeRegistrosP: (state) => {
        return state.st_puestos.length
    }, //* (state)
    filtrarRegistrosP: (state) =>
        (token) => {
            return state.st_puestos.filter((parametro, index) => {

                if (state.st_puestos[index]
                    .descripcion.toUpperCase()
                    .includes(token.buscar.toUpperCase())
                ) {

                    return state.st_puestos[index].descripcion
                }
            }) //* return
        }, //* (token)        
    /*//? =========================================================================================== */
    /*//? ESTADOS CIVILES */
    totaldeRegistrosEC: (state) => {
        return state.st_ECiviles.length
    }, //* (state)
    filtrarRegistrosEC: (state) =>
        (token) => {
            return state.st_ECiviles.filter((parametro, index) => {

                if (state.st_ECiviles[index]
                    .descripcion.toUpperCase()
                    .includes(token.buscar.toUpperCase())
                ) {

                    return state.st_ECiviles[index].descripcion
                }
            }) //* return
        }, //* (token)        
}