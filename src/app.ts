import dotenv from 'dotenv';
import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyJWT from '@fastify/jwt';
import userRoutes from "./modules/user/user.route";
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';

const dotenvResult = dotenv.config()
if (dotenvResult.error) {
    throw dotenvResult.error
}

export const server = Fastify()

//melhor fazer isso num type file
declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}


server.register(fastifyJWT, { secret: 'batatadoce' })

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        return reply.send(err)
    }
})

// deixar isso em outro arquivo
server.get('/healthcheck', async () => {
    return { status: "OK" }
})


const main = async () => {

    for (const schemas of [...userSchemas, ...productSchemas]) {
        server.addSchema(schemas)
    }

    //Fastify allows the user to extend its functionality with plugins. A plugin can be a set of routes, a server decorator, or whatever
    server.register(userRoutes, { prefix: 'api/users' })
    //server.register(productRoutes, { prefix: 'api/products' })

    await server.listen({ port: 3000, host: '0.0.0.0' })
        .then((address) => console.log(`Server ready on ${address}`))
        .catch(err => {
            console.error('Error starting server:', err)
            process.exit(1)
        })
}

main()