import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../models/db'

type Post = (req: Request<{}, {}, Paths.Examples.Post.RequestBody>, res: Response) => void

export const post: Post = async (req, res) => {
    const example = await prisma.example.create({
        data: {
            name: req.body.name
        }
    })
    return res.status(StatusCodes.OK).json(example)
}

type Get = (
    req: Request<{}, {}, {}, Paths.Examples.Get.QueryParameters>,
    res: Response<
        Paths.Examples.Get.Responses.$200 |
        Paths.Examples.Get.Responses.$400 |
        Paths.Examples.Get.Responses.$404
    >
) => void

export const get: Get = async (req, res) => {
    if (req.query.test > 5) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Unacceptable' })
    }
    const examples = await prisma.example.findMany()
    return res.status(StatusCodes.OK).json(examples)
}