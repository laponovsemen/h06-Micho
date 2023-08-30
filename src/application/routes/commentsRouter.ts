import { CommentVdChain } from '../../inputValidation'
import {
    CommentInputModel,
    CommentViewModel,
    TypeOfRequestP, TypeOfRequestP_Body
} from '../../types/models'
import { Request, Response, Router } from 'express'
import { Result, validationResult } from 'express-validator'
import { ErrorMapper } from '../../utils/errorMapper'
import { usersService } from '../../domain/users-service'
import { authMiddleware } from "../../middlewares/auth-middleware";
import { commentsQueryRepo } from "../../repositories/query/comments-query-repository";
import { commentsService } from "../../domain/comments-service";

export const commentsRouter = Router({})

commentsRouter.put('/:id', authMiddleware, CommentVdChain, async (req: TypeOfRequestP_Body<{ id: string }, CommentInputModel>, res: Response) => {

    const result: Result = validationResult(req)

    if (await commentsQueryRepo.exists(req.params.id)) {
        if (result.isEmpty()) {
            res.status(201).json(await commentsService.update(req))
        } else {
            res.status(400).json(await ErrorMapper(result))
        }
    } else {
        res.sendStatus(404)
    }
})

commentsRouter.get('/:id', async (req: Request, res: Response<CommentViewModel | null>) => {

    if (await commentsQueryRepo.exists(req.params.id)) {
        res.status(200).json(await commentsQueryRepo.get(req.params.id))
    } else {
        res.sendStatus(404)
    }
})

commentsRouter.delete('/:id', authMiddleware, async (req: TypeOfRequestP<{ id: string }>, res: Response) => {
    res.sendStatus(await usersService.delete(req))
})