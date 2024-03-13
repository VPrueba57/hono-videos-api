import { Hono } from 'hono'
import { actorRoutes } from './routers/actor';
import { videoRoutes } from './routers/video';
import { Bindings } from 'hono/types';

const app = new Hono<{ Bindings: Bindings }>()

app.route('/api/actor', actorRoutes );
app.route('/api/video', videoRoutes );

export default app