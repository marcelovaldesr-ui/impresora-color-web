// Lista de servicios para el menú desplegable del navbar.
// href: página dedicada si existe; si no, ancla a la card del home (funciona
// desde cualquier página porque parte con "/").
export type NavServicio = { label: string; href: string };
export type NavCategoria = { categoria: string; color: string; items: NavServicio[] };

export const NAV_SERVICIOS: NavCategoria[] = [
  {
    categoria: "Publicidad y marketing",
    color: "#E91E8F",
    items: [
      { label: "Flyers publicitarios", href: "/#servicio-flyers" },
      { label: "Bolsas Sublimación", href: "/#servicio-bolsas-sublimacion" },
      { label: "Tarjetas de presentación", href: "/#servicio-tarjetas" },
      { label: "Pendones y Rollers", href: "/pendones-chillan" },
      { label: "Menús para locales", href: "/#servicio-menus" },
      { label: "Imanes publicitarios", href: "/#servicio-imanes" },
      { label: "Dípticos y trípticos", href: "/#servicio-dipticos" },
    ],
  },
  {
    categoria: "Etiquetas y packaging",
    color: "#7DBA2F",
    items: [
      { label: "Etiquetas adhesivas", href: "/etiquetas-cecinas" },
      { label: "Stickers personalizados", href: "/stickers-chillan" },
      { label: "Stickers para packaging", href: "/#servicio-packaging" },
    ],
  },
  {
    categoria: "Documentos y oficina",
    color: "#47B7E8",
    items: [
      { label: "Tarjetas y Credenciales", href: "/#servicio-credenciales-fargo" },
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
    ],
  },
];
