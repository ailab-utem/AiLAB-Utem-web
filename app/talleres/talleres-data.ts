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
  { codigo: "M07", titulo: "Introducción a Python", estado: "proximamente" },
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
