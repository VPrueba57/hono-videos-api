import { Hono } from 'hono'
import { actorRoutes } from './routers/actor';
import { videoRoutes } from './routers/video';
import { Bindings } from 'hono/types';
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.route('/api/actor', actorRoutes );
app.route('/api/video', videoRoutes );

export default app