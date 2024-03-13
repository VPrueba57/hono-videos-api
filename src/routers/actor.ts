import { Hono } from 'hono';

export const actorRoutes = new Hono();

actorRoutes.get("/", async (c) => {
	try {
		const page = Number(c.req.query('page') || 1);
		const limit = Number(c.req.query('limit') || 10);
		let { results } = await c.env.DB.prepare("SELECT * FROM Actor LIMIT ? OFFSET ?").bind(limit, (page - 1) * limit).all();
		return c.json(results);
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500);
	}
})

actorRoutes.get("/:id", async (c) => {
	const actorId = c.req.param("id")
	try {
		let { results } = await c.env.DB.prepare("SELECT * FROM Actor WHERE ActorId = ?").bind(actorId).all()
		return c.json(results)
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

actorRoutes.post("/", async (c) => {
	const { name, birthDate, birthPlace, ethinicity, nationality, height, hairColor, naturalBoobs, drilling, tattoos, image } = await c.req.json();
	try {
		await c.env.DB.prepare("INSERT INTO Actor (ActorName, BirthDate, BirthPlace, Ethinicity, Nationality, Height, HairColor, NaturalBoobs, Drilling, Tattoos, Image) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)").bind(name, birthDate, birthPlace, ethinicity, nationality, height, hairColor, naturalBoobs, drilling, tattoos, image).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

actorRoutes.put("/:id", async (c) => {
	const actorId = c.req.param("id")
	const { name, birthDate, birthPlace, ethinicity, nationality, height, hairColor, naturalBoobs, drilling, tattoos, image } = await c.req.json();
	try {
		await c.env.DB.prepare("UPDATE Actor SET ActorName = ?1, BirthDate = ?2, BirthPlace = ?3, Ethinicity, Nationality, Height, HairColor, NaturalBoobs, Drilling, Tattoos, Image WHERE ActorId = ?12").bind(name, birthDate, birthPlace, ethinicity, nationality, height, hairColor, naturalBoobs, drilling, tattoos, image, actorId).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

actorRoutes.delete("/:id", async (c) => {
	const actorId = c.req.param("id")
	try {
		await c.env.DB.prepare("DELETE FROM Actor WHERE ActorId = ?").bind(actorId).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})

actorRoutes.post("/:id/videos/:videoId", async (c) => {
	const userId = c.req.param("id")
	const videoId = c.req.param("videoId")
	try {
		await c.env.DB.prepare("INSERT INTO ActorVideo (ActorId, VideoId) VALUES (?1, ?2)").bind(userId, videoId).run()
		return c.json({ success: true })
	} catch (e) {
		console.log(e);
		return c.json({ err: e }, 500)
	}
})