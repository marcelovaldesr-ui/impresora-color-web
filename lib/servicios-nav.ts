// Lista de servicios para el menú desplegable del navbar.
// href: página dedicada si existe; si no, ancla a la card del home (funciona
// desde cualquier página porque parte con "/").
export type NavServicio = { label: string; href: string };
export type NavCategoria = { categoria: string; color: string; items: NavServicio[] };

export const NAV_SERVICIOS: NavCategoria[] = [
  {
    categoria: "Publicidad y emprendimientos",
    color: "#E91E8F",
    items: [
      { label: "Flyers publicitarios", href: "/#servicio-flyers" },
      { label: "Stickers personalizados", href: "/stickers-chillan" },
      { label: "Etiquetas adhesivas", href: "/etiquetas-cecinas" },
      { label: "Tarjetas de presentación", href: "/#servicio-tarjetas" },
      { label: "Pendones y Rollers", href: "/pendones-chillan" },
      { label: "Menús para locales", href: "/#servicio-menus" },
      { label: "Imanes publicitarios", href: "/#servicio-imanes" },
      { label: "Stickers para packaging", href: "/#servicio-packaging" },
      { label: "Bolsas Sublimación", href: "/#servicio-bolsas-sublimacion" },
      { label: "Dípticos y trípticos", href: "/#servicio-dipticos" },
    ],
  },
  {
    categoria: "Oficina, colegios y empresas",
    color: "#47B7E8",
    items: [
      { label: "Fotocopias", href: "/#servicio-fotocopias" },
      { label: "Impresiones", href: "/#servicio-impresiones" },
      { label: "Anillados", href: "/#servicio-anillados" },
      { label: "Timbres personalizados", href: "/#servicio-timbres" },
      { label: "Empastados", href: "/#servicio-empastados" },
      { label: "Diplomas", href: "/#servicio-diplomas" },
      { label: "Sobres", href: "/#servicio-sobres" },
      { label: "Carpetas corporativas", href: "/#servicio-carpetas-corporativas" },
      { label: "Reglamentos internos", href: "/#servicio-reglamentos" },
      { label: "Calendarios", href: "/#servicio-calendarios" },
      { label: "Tarjetas y Credenciales", href: "/#servicio-credenciales-fargo" },
    ],
  },
];
