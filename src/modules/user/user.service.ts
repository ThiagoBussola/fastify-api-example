import { hashPassword } from "../../utils/hash"
import prisma from "../../utils/prisma"
import { CreateUserInput } from "./user.schema"

export const createUser = async (input: CreateUserInput) => {

    const { password, ...rest } = input

    const { hash, salt } = hashPassword(password)

    const emailExists = await findUserByEmail(input.email)

    if (emailExists) {
        return "This email is already registered"
    }

    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash },
    })

    return user
}

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export const findUsers = async () => {
    return prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    })
}
