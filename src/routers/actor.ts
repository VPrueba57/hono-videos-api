import { Context, Env, Hono } from 'hono';
import { BlankInput } from 'hono/types';

export const actorRoutes = new Hono();

const buildWhere = (c:Context<Env, "/", BlankInput>) => {
	const { ethinicity, nationality, birthPlace, hairColor, naturalBoobs, drilling, tattoos } = c.req.query()
	let where = '';
	if( ethinicity && typeof ethinicity === "string" ){
		where += ` AND Ethinicity = '${ethinicity}' `;
	}
	if( nationality && typeof nationality === "string"){
		where += ` AND Nationality = '${nationality}' `;
	}
	if( birthPlace && typeof birthPlace === "string"){
		where += ` AND BirthPlace = '${birthPlace}' `;
	}
	if( hairColor && typeof hairColor === "string"){
		where += ` AND HairColor = '${hairColor}' `;
	}
	if( naturalBoobs && typeof naturalBoobs === "boolean"){
		where += ` AND NaturalBoobs = '${naturalBoobs?"true":"false"}' `;
	}
	if( drilling && typeof drilling === "boolean"){
		where += ` AND Drilling = '${drilling?"true":"false"}' `;
	}
	if( tattoos && typeof tattoos === "boolean"){
		where += ` AND Tattoos = '${tattoos?"true":"false"}' `;
	}
	return where;
}

actorRoutes.get("/", async (c) => {
	try {
		const page = Number(c.req.query('page') || 1);
		const limit = Number(c.req.query('limit') || 10);
		const where = buildWhere(c);
		let { results } = await c.env.DB.prepare(` SELECT * FROM Actor WHERE 1=1 ${where} LIMIT ? OFFSET ?` ).bind(limit, (page - 1) * limit).all();
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