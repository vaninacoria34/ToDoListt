# ToDoList

## Descripción
Desarrollo de una aplicación web que permita a los usuarios gestionar una lista de tareas. Los usuarios podrán agregar nuevas tareas, marcar tareas como completadas, editar tareas existentes y eliminar tareas.
La aplicación cuenta con una interfaz intuitiva y fácil de usar.

# Tablero de tareas:
https://trello.com/invite/b/66e1f9e80a13193ef7f8ad4d/ATTIa38c12361ddbd6c198b73799f77f9d5c8289251A/todolist

## Tecnologías
- **Frontend**: React, Bootstrap y CSS
- **Backend**: Node.js, Express.js y Bcryptjs
- **Base de Datos**: MySQL 

## Instalación
### Prerrequisitos
- Tener instalado Node.js y npm.
- Tener instalado un servidor de bases de datos como [XAMPP](https://www.apachefriends.org/es/index.html) (o cualquier otro que incluya MySQL).
- Tener MySQL configurado.

### Pasos para ejecutar la aplicación
1. Clona este repositorio:
```bash
git clone https://github.com/ValeriaDurruty/ToDoList.git
```
2. Configuración de la base de datos:
- Navega a la carpeta **`server/database`** dentro del proyecto.
- Importa el archivo **`ToDoList.sql`** en tu servidor MySQL. Puedes hacerlo usando phpMyAdmin desde XAMPP o desde la línea de comandos.
- Asegúrate de que tu base de datos esté funcionando correctamente.
3. Configuración del backend (Node.js):
- Navega a la carpeta **`server`**:
```bash
cd ToDoList/server
```
- Instala las dependencias necesarias:
```bash
npm install
```
- Ejecuta el servidor backend:
```bash
node app.js
```
- El servidor backend estará corriendo en **`http://localhost:3001`**.
4. Configuración del frontend (React):
- Navega a la carpeta del frontend:
```bash
cd ../lista-de-tareas-react
```
- Instala las dependencias necesarias:
```bash
npm install
```
- Ejecuta la aplicación React:
```bash
npm start
```
- El frontend estará disponible en **`http://localhost:3000`**.

## Notas adicionales
- **Base de datos**: El archivo **`ToDoList.sql`** se encuentra en la carpeta **`server/database`**. Puedes levantar la base de datos usando **XAMPP**, **WAMP**, o cualquier otro servidor MySQL de tu preferencia.
- Asegúrate de que tanto el servidor backend como el frontend estén corriendo al mismo tiempo para que la aplicación funcione correctamente.

## Funcionalidades
- Agregar, borrar, modificar y listar tareas.
- Agregar, borrar, modificar y listar categorías.
- Agregar, borrar, modificar y listar estados.
- Filtros de tareas por categoría, estado y prioridad.
- Registro y Login de usuarios.

