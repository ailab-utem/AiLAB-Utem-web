/**
 * Registro de proyectos del laboratorio.
 *
 * La página los agrupa automáticamente en dos bloques según `status`:
 *   "in_progress" -> PROYECTOS EN CURSO
 *   "completed"   -> PROYECTOS TERMINADOS
 *
 * Para publicar uno, agrega un objeto al arreglo. Solo `nombre` es obligatorio;
 * los campos que dejes sin completar simplemente no se renderizan (no se
 * inventa un valor de relleno). El código correlativo NO se escribe a mano:
 * lo asigna `proyectosPorEstado()`.
 */
export type EstadoProyecto = "in_progress" | "completed";

export type Proyecto = {
  nombre: string;
  descripcion?: string;
  /** Categoría o área temática. */
  categoria?: string;
  /**
   * Estado del proyecto. Ver `statusDe()` antes de omitirlo: un proyecto sin
   * `status` NO se considera confirmado como "en curso".
   */
  status?: EstadoProyecto;
  /** Fecha o periodo, p. ej. "2026-S1" o "Mar 2026 — Jul 2026". */
  periodo?: string;
  /** Tecnologías, herramientas o etiquetas. */
  tecnologias?: string[];
  /**
   * Enlace a más información. Solo se renderiza el botón "VER PROYECTO_" si
   * este campo tiene una URL real; no se genera ninguna ruta automáticamente.
   */
  url?: string;
  /**
   * Imagen de portada, p. ej. "/proyectos/p01.webp" para un archivo en
   * `public/proyectos/`. El espacio se reserva siempre: si este campo está
   * vacío, la tarjeta muestra el marco con la etiqueta "// SIN IMAGEN_".
   */
  imagen?: string;
  /** Texto alternativo de `imagen`. Descríbela; no repitas el nombre. */
  imagenAlt?: string;
};

/** Proyecto ya ubicado en su bloque, con el código correlativo resuelto. */
export type ProyectoNumerado = Proyecto & { codigo: string };

/**
 * OJO: TODAS las entradas de abajo son EJEMPLOS para previsualizar cómo se ven
 * los bloques. No corresponden a proyectos reales del laboratorio.
 *
 * Cubren a propósito los distintos casos que la tarjeta sabe manejar: con y sin
 * imagen, con y sin enlace, sin descripción, sin tecnologías, sin periodo y con
 * un nombre largo que ocupa dos líneas. Así se ve de una vez cómo responde la
 * grilla a datos incompletos.
 *
 * Las imágenes son los PNG de demostración de `public/proyectos/` y la URL
 * apunta al repositorio del club: son marcadores, no datos del proyecto.
 * Reemplázalas por los proyectos verdaderos —o vacía el arreglo, que entonces
 * ambos bloques vuelven a mostrar su mensaje de vacío—.
 */
export const proyectos: Proyecto[] = [
  {
    nombre: "Proyecto de ejemplo en curso",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Visión computacional",
    status: "in_progress",
    periodo: "2026-S1",
    tecnologias: ["Python", "PyTorch", "Docker"],
    imagen: "/proyectos/demo-02.png",
    imagenAlt: "Imagen de ejemplo",
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo con un nombre largo para verificar el ajuste a dos líneas",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Aprendizaje profundo",
    status: "in_progress",
    periodo: "2026-S1",
    tecnologias: ["Python", "JAX"],
    imagen: "/proyectos/demo-03.png",
    imagenAlt: "Imagen de ejemplo",
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo sin imagen",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Datos",
    status: "in_progress",
    periodo: "2026-S1",
    tecnologias: ["Pandas", "DuckDB"],
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo sin enlace",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Robótica",
    status: "in_progress",
    periodo: "2026-S2",
    tecnologias: ["ROS", "C++"],
    imagen: "/proyectos/demo-04.png",
    imagenAlt: "Imagen de ejemplo",
  },
  {
    nombre: "Ejemplo sin descripción",
    categoria: "Infraestructura",
    status: "in_progress",
    periodo: "2026-S1",
    tecnologias: ["Kubernetes"],
    imagen: "/proyectos/demo-01.png",
    imagenAlt: "Imagen de ejemplo",
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo mínimo",
    status: "in_progress",
  },
  {
    nombre: "Proyecto de ejemplo terminado",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Procesamiento de lenguaje",
    status: "completed",
    periodo: "2025-S2",
    tecnologias: ["Next.js", "TypeScript"],
    imagen: "/proyectos/demo-01.png",
    imagenAlt: "Imagen de ejemplo",
  },
  {
    nombre: "Ejemplo terminado con enlace",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Visión computacional",
    status: "completed",
    periodo: "2025-S2",
    tecnologias: ["Python", "OpenCV"],
    imagen: "/proyectos/demo-02.png",
    imagenAlt: "Imagen de ejemplo",
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo terminado sin imagen",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Ciberseguridad",
    status: "completed",
    periodo: "2025-S1",
    tecnologias: ["Go", "Wireshark"],
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo terminado sin tecnologías",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Divulgación",
    status: "completed",
    periodo: "2025-S1",
    imagen: "/proyectos/demo-03.png",
    imagenAlt: "Imagen de ejemplo",
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo terminado sin periodo",
    descripcion:
      "Descripción de ejemplo para previsualizar la tarjeta. Reemplaza este texto por el resumen real del proyecto cuando el equipo lo confirme.",
    categoria: "Educación",
    status: "completed",
    tecnologias: ["Jupyter"],
    imagen: "/proyectos/demo-04.png",
    imagenAlt: "Imagen de ejemplo",
    url: "https://github.com/ailab-utem/AiLAB-Utem-web",
  },
  {
    nombre: "Ejemplo terminado mínimo",
    status: "completed",
  },
];

/**
 * Agrupa un proyecto cuyo estado no está declarado.
 *
 * TODO(estado): un proyecto sin `status` cae provisionalmente en
 * "PROYECTOS EN CURSO". Esto es un valor por defecto, no una afirmación:
 * confirma el estado real con el equipo y declara `status` de forma explícita
 * en el arreglo `proyectos` de arriba.
 */
export function statusDe(proyecto: Proyecto): EstadoProyecto {
  return proyecto.status ?? "in_progress";
}

/**
 * Devuelve los proyectos de un bloque, numerados de forma independiente: el
 * primero de cada bloque es P01, el segundo P02, y así. Es decir, el primer
 * proyecto en curso y el primer proyecto terminado son ambos P01.
 *
 * El número sale de la posición dentro del bloque, así que agregar un proyecto
 * al arreglo `proyectos` le asigna solo el correlativo que le corresponde, y
 * mover uno de un bloque a otro renumera ambos sin tocar nada más.
 */
export function proyectosPorEstado(
  estado: EstadoProyecto,
  lista: Proyecto[] = proyectos,
): ProyectoNumerado[] {
  return lista
    .filter((proyecto) => statusDe(proyecto) === estado)
    .map((proyecto, i) => ({
      ...proyecto,
      codigo: `P${String(i + 1).padStart(2, "0")}`,
    }));
}
