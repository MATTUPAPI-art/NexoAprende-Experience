export interface Body {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  held: boolean;
}
export function contain(body: Body, width: number, height: number): void {
  const r = body.radius;
  if (body.x < r) {
    body.x = r;
    body.vx = Math.abs(body.vx) * 0.86;
  }
  if (body.x > width - r) {
    body.x = Math.max(r, width - r);
    body.vx = -Math.abs(body.vx) * 0.86;
  }
  if (body.y < r) {
    body.y = r;
    body.vy = Math.abs(body.vy) * 0.86;
  }
  if (body.y > height - r) {
    body.y = Math.max(r, height - r);
    body.vy = -Math.abs(body.vy) * 0.86;
  }
}
/** Small fixed-substep circle simulation. Positions are pixels, velocities pixels/second. */
export function advance(bodies: Body[], width: number, height: number, elapsed: number): void {
  const seconds = Math.min(Math.max(elapsed, 0), 0.05);
  const steps = Math.max(1, Math.ceil(seconds / 0.008));
  const dt = seconds / steps;
  for (let step = 0; step < steps; step++) {
    for (const body of bodies) {
      if (body.held) continue;
      const damping = Math.exp(-0.19 * dt);
      body.vx *= damping;
      body.vy *= damping;
      // A gentle ambient current keeps resting objects drifting without sudden acceleration.
      if (Math.hypot(body.vx, body.vy) < 24) {
        body.vx += Math.cos(body.id * 2.4) * 9 * dt;
        body.vy += Math.sin(body.id * 2.4) * 9 * dt;
      }
      body.x += body.vx * dt;
      body.y += body.vy * dt;
      contain(body, width, height);
    }
    for (let i = 0; i < bodies.length; i++)
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i],
          b = bodies[j];
        let dx = b.x - a.x,
          dy = b.y - a.y;
        const distance = Math.hypot(dx, dy),
          overlap = a.radius + b.radius - distance;
        if (overlap <= 0) continue;
        if (distance < 0.001) {
          dx = 1;
          dy = 0;
        }
        const length = Math.hypot(dx, dy),
          nx = dx / length,
          ny = dy / length;
        const ia = a.held ? 0 : 1 / a.mass,
          ib = b.held ? 0 : 1 / b.mass,
          sum = ia + ib;
        if (!sum) continue;
        a.x -= (nx * overlap * ia) / sum;
        a.y -= (ny * overlap * ia) / sum;
        b.x += (nx * overlap * ib) / sum;
        b.y += (ny * overlap * ib) / sum;
        const closing = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (closing < 0) {
          const impulse = (-(1 + 0.88) * closing) / sum;
          a.vx -= impulse * nx * ia;
          a.vy -= impulse * ny * ia;
          b.vx += impulse * nx * ib;
          b.vy += impulse * ny * ib;
        }
        contain(a, width, height);
        contain(b, width, height);
      }
  }
}
