// Divisor de sección en forma de onda — reemplaza el corte recto entre dos
// bloques de color para dar más fluidez visual. Puramente decorativo (aria-hidden).
type SeccionOndaProps = {
  /** Color de la sección de arriba (el que "baja" en la curva) */
  colorArriba: string;
  /** Color de la sección de abajo (queda detrás, se ve bajo la curva) */
  colorAbajo: string;
  /** Alto del divisor en px */
  alto?: number;
  /** Invierte la curva verticalmente (para usarla como cierre en vez de apertura) */
  invertir?: boolean;
};

export default function SeccionOnda({
  colorArriba,
  colorAbajo,
  alto = 70,
  invertir = false,
}: SeccionOndaProps) {
  return (
    <div aria-hidden="true" style={{ background: colorAbajo, lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: alto,
          transform: invertir ? "scaleY(-1)" : undefined,
        }}
      >
        <path
          d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          fill={colorArriba}
        />
      </svg>
    </div>
  );
}
