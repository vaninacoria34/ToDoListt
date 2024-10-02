import React from 'react';
import AgregarCategoria from './AgregarCategoria'; // Importa el componente AgregarCategoria
import AgregarEstado from './AgregarEstado'; // Importa el componente AgregarEstado

// Definimos un componente funcional llamado PaginaAgregarMas que recibe cuatro props: 
// 'agregarCategoria' (función para agregar una nueva categoría), 
// 'agregarEstado' (función para agregar un nuevo estado), 
// 'categorias' (lista de categorías actuales) y 
// 'estados' (lista de estados actuales).
function PaginaAgregarMas({ agregarCategoria, agregarEstado, categorias, estados }) {
  return (
    // Div principal que envuelve todo el contenido.
    <div>
      {/* Título de la página */}
      <h2>Agregar Más Categorías y Estados</h2>
      
      {/* Contenedor con margen superior para agregar categorías */}
      <div style={{ marginTop: '20px' }}>
        {/* Incluimos el componente AgregarCategoria, pasándole como props la función 'agregarCategoria' y la lista 'categorias'. */}
        <AgregarCategoria agregarCategoria={agregarCategoria} categorias={categorias} />
      </div>
      
      {/* Contenedor con margen superior para agregar estados */}
      <div style={{ marginTop: '20px' }}>
        {/* Incluimos el componente AgregarEstado, pasándole como props la función 'agregarEstado' y la lista 'estados'. */}
        <AgregarEstado agregarEstado={agregarEstado} estados={estados} />
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser utilizado en otros archivos.
export default PaginaAgregarMas;
