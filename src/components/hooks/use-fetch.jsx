import { useEffect, useReducer} from 'react';

const estadoInicial = {
    data: null,
    error: null,
    loading: true
}

const fetchReducer = (estado, accion) => {
    if (accion.tipo === 'FETCH_START'){
        return{
            ...estado
        } 
    }

    if (accion.tipo === 'FETCH_SUCCES'){
        return {
            data: accion.payload,
            error: false,
            loading: false
        };
    }

    if (accion.tipo === 'FETCH_ERROR'){
        return {
            data: null,
            error: accion.payload,
            loading: false
        };
    }

    return estadoInicial;
}

function useFetch(url){

    const [fetchState, dispatch] = useReducer(fetchReducer, estadoInicial);
    
    const fetchData = async function fetchData(){
            dispatch({ tipo: 'FETCH_START' });
            
            try {
                const response = await fetch(url);                
                const info = await response.json();

                dispatch( {tipo: 'FETCH_SUCCES', payload: info} );
            } catch (error) {
                dispatch({ tipo: 'FETCH_ERROR', payload: error.message });
            }
        }

    useEffect(() => {
        fetchData();
    }, []);

    return fetchState;
}

export default useFetch;