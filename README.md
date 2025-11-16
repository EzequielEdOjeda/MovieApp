# 🎬 MovieApp | Proyecto React 

Aplicación desarrollada para el **Informatorio - Chaco**, dentro de la especialidad **React**.  
Se trata de una **web app moderna y responsiva** para explorar películas y series, con búsqueda, favoritos, modal informativo y un diseño inspirado en plataformas de *streaming*.

---

## ✨ Características Principales

### 💻 Tecnología Base
- Desarrollado con **React** y **Vite**.
- Arquitectura modular basada en **componentes funcionales**.
- Llamadas a la API con **Axios**.

### 🎨 Diseño y UI
- Diseño completamente **responsivo** (móvil / tablet / escritorio).
- Navbar con menú hamburguesa animado.
- Grid dinámico de tarjetas (5 por fila en escritorio).
- Modal informativo con imagen, overview, fecha y rating.
- Placeholder automático para imágenes faltantes.

### 🔍 Búsqueda Inteligente
- Búsqueda en:
  - Películas  
  - Series  
  - Favoritos  
- Filtrado en tiempo real según lo escrito.

### ⭐ Sistema de Favoritos (localStorage)
- Agregar o quitar favoritos desde:
  - Las tarjetas (`MovieCard`)
  - El modal de detalles
- Favoritos persistentes mediante **localStorage**.
- Sección dedicada para gestionar favoritos.
- Permite abrir la información completa desde la sección Favoritos.

### 📊 Lógica y Manejo de Datos
- Hooks personalizados:
  - `useMovies`
  - `useSeries`
  - `useFavorites`
- Manejo de errores y estados:
  - “Cargando…” centrado
  - “No hay resultados”
  - “No tienes favoritos aún”
- Normalización de datos para unificar estructura entre Películas y Series.

---

## 🌐 Configuración y Uso

Para ejecutar el proyecto localmente, sigue estos pasos:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/EzequielEdOjeda/MovieApp.git
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crear un archivo .env en la raíz del proyecto y agregar::
    ```bash
    VITE_API_KEY=TU_API_KEY_AQUI
    ```
4.  Inicia la aplicación en modo desarrollo:
    ```bash
    npm run dev
    ```

El proyecto estará disponible en `http://localhost:5173/` (o el puerto que indique Vite).

---

**¡Gracias por visitar el repositorio!** 🚀
