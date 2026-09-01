import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Orígenes autorizados a pedir recursos internos del servidor de desarrollo
   * (`/_next/static/...`). Sin esto, al abrir la página desde otro equipo de la
   * red —por ejemplo el teléfono entrando por la IP local— Next sirve el HTML
   * pero BLOQUEA los chunks de JavaScript: la página se ve bien, React no
   * hidrata y nada responde al tocar.
   *
   * Solo afecta a `next dev`; en producción se ignora. Si cambia la IP del
   * equipo (otra red, DHCP), hay que actualizarla aquí.
   */
  allowedDevOrigins: ["192.168.100.6"],
};

export default nextConfig;
