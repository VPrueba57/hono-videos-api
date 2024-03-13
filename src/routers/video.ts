import { Hono } from 'hono';

export const videoRoutes = new Hono();

videoRoutes.get("/", async (c) => {
	try {
		const page = Number(c.req.query('page') || 1);
		const limit = Number(c.req.query('limit') || 10);
		let { results } = await c.env.DB.prepare("SELECT * FROM Video LIMIT ? OFFSET ?").bind(limit, (page-1) * limit).all();
		return c.json(results);
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500);
	}
})

videoRoutes.get("/:id", async (c) => {
	const videoId = c.req.param("id")
	try {
		let { results } = await c.env.DB.prepare("SELECT * FROM Video WHERE VideoId = ?").bind(videoId).all()
		return c.json(results)
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

videoRoutes.post("/", async (c) => {
	const { title, url, description, duration, releaseDate, studio, image } = await c.req.json();
	try {
		await c.env.DB.prepare("INSERT INTO Video (Title, url, Description, Duration, ReleaseDate, Studio, Image) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)").bind(title, url, description, duration, releaseDate, studio, image).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

videoRoutes.put("/:id", async (c) => {
	const videoId = c.req.param("id")
	const { title, url, description, duration, releaseDate, studio, image } = await c.req.json();
	try {
		await c.env.DB.prepare("UPDATE Video SET Title = ?1, url = ?2, Description = ?3, Duration = ?4, ReleaseDate = ?5, Studio = ?6, Image = ?7 WHERE VideoId = ?8").bind(title, url, description, duration, releaseDate, studio, image, videoId).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

videoRoutes.delete("/:id", async (c) => {
	const videoId = c.req.param("id")
	try {
		await c.env.DB.prepare("DELETE FROM Video WHERE VideoId = ?").bind(videoId).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

videoRoutes.post("/:id/actors/:actorId", async (c) => {
	const videoId = c.req.param("id")
	const actorId = c.req.param("actorId")
	try {
		await c.env.DB.prepare("INSERT INTO ActorVideo (ActorId, VideoId) VALUES (?1, ?2)").bind(actorId, videoId).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

