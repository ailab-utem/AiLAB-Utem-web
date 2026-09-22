/**
 * Cada entrada es un módulo del programa de talleres.
 * Hoy solo llevan `codigo`, `titulo` y `estado`: el resto de los campos queda
 * listo para completarse cuando el programa defina cada curso.
 * Para agregar un espacio vacío, añade un objeto `{ codigo: "M12" }`.
 *
 * `estado` se infiere cuando no se declara: sin `titulo` => "sin-asignar",
 * con `titulo` => "disponible".
 */
export type EstadoTaller = "disponible" | "proximamente" | "sin-asignar";

export type Taller = {
  codigo: string;
  titulo?: string;
  descripcion?: string;
  nivel?: string;
  duracion?: string;
  cupos?: string;
  estado?: EstadoTaller;
  /** Objetivos de aprendizaje, uno por línea. */
  objetivos?: string[];
  /** Unidades o contenidos del módulo, en orden. */
  contenidos?: string[];
  /** URL externa donde se cursa el módulo (ej. notebook de Colab). */
  enlace?: string;
};

export const talleres: Taller[] = [
  { codigo: "M01", titulo: "Curso pipeline", estado: "proximamente" },
  { codigo: "M02", titulo: "Curso redes", estado: "proximamente" },
  { codigo: "M03", titulo: "Curso BDD", estado: "proximamente" },
  { codigo: "M04", titulo: "Curso dashboard", estado: "proximamente" },
  { codigo: "M05", titulo: "Curso de agentes", estado: "proximamente" },
  {
    codigo: "M06",
    titulo: "Diseño y desarrollo web (Con y Sin AI)",
    estado: "proximamente",
  },
  {
    codigo: "M07",
    titulo: "Introducción a Python",
    estado: "disponible",
    descripcion:
      "Taller autoguiado para dar tus primeros pasos en Python sin experiencia previa. Corre completo en el navegador vía Google Colab, sin instalar nada. Termina con un mini-proyecto de análisis de notas que junta todo lo aprendido.",
    nivel: "Principiante",
    duracion: "Autoguiado (~2 h)",
    cupos: "Sin límite",
    objetivos: [
      "Escribir y ejecutar tus primeros programas en Python",
      "Usar variables, tipos de datos y operadores aritméticos/de comparación",
      "Tomar decisiones con if / elif / else",
      "Repetir tareas con bucles for y while",
      "Guardar y recorrer datos con listas",
      "Escribir funciones reutilizables",
      "Aplicar todo lo anterior en un mini-proyecto de análisis de datos",
    ],
    contenidos: [
      "Cómo usar el cuaderno",
      "¿Qué es Python y para qué sirve?",
      "print() y comentarios",
      "Variables y tipos de datos",
      "Operadores aritméticos y de comparación",
      "input(): pedir datos al usuario",
      "Condicionales: if / elif / else",
      "Bucles: for y while",
      "Listas",
      "Funciones",
      "Mini-proyecto: analizador de notas",
    ],
    enlace: "https://colab.research.google.com/drive/17AtuXQOABL0egdNq1BfZd5WY2qEkQs-S?usp=sharing",
  },
  {
    codigo: "M08",
    titulo: "Introducción al machine learning",
    estado: "proximamente",
  },
  { codigo: "M09", titulo: "Curso de machine learning", estado: "proximamente" },
  { codigo: "M10", titulo: "Curso de deep learning", estado: "proximamente" },
  {
    codigo: "M11",
    titulo: "Curso de ciberseguridad con IA",
    estado: "proximamente",
  },
];

export function estadoDe(taller: Taller): EstadoTaller {
  return taller.estado ?? (taller.titulo ? "disponible" : "sin-asignar");
}

export const ESTADO_LABEL: Record<EstadoTaller, string> = {
  disponible: "Disponible",
  proximamente: "Próximamente",
  "sin-asignar": "Sin asignar",
};
