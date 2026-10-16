import { describe, expect, it } from "vitest";
import { fromPosgarFaja2, toPosgarFaja2 } from "./coords";

const LAT = -(38 + 7 / 60 + 47.78 / 3600);
const LON = -(68 + 34 / 60 + 8.97 / 3600);

describe("POSGAR faja 2 (EPSG:22182)", () => {
  it("punto de A.7: X (norte) ~5779960, Y (este) ~2537773", () => {
    const { x, y } = toPosgarFaja2(LAT, LON);
    expect(Math.abs(x - 5779960)).toBeLessThan(2);
    expect(Math.abs(y - 2537773)).toBeLessThan(2);
  });
  it("meridiano central en el ecuador: Y = falso este, X = falso norte", () => {
    const { x, y } = toPosgarFaja2(0, -69);
    expect(x).toBeCloseTo(10000000, 3);
    expect(y).toBeCloseTo(2500000, 3);
  });
  it("la inversa recupera lat/lon", () => {
    const { x, y } = toPosgarFaja2(LAT, LON);
    const r = fromPosgarFaja2(x, y);
    expect(r.lat).toBeCloseTo(LAT, 9);
    expect(r.lon).toBeCloseTo(LON, 9);
  });
});
