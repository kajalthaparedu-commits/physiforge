import { UniverseRenderer } from "./universe/UniverseRenderer.js"

/* Run ONLY on landing page */
const isLanding =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname.includes("/physiforge/")

if (isLanding) {
  const universe = new UniverseRenderer()
  universe.start()
}
