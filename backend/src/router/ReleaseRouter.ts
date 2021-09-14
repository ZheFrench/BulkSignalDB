import { Router } from 'express'
import { getReleases, getRelease ,getIndexInteractors,getIndexInteractions,getInteractorsUsingTypeAndIndex } from '../controllers/ReleaseController.js'

const releaseRouter = Router()

releaseRouter.get('/api/releases', getReleases);

releaseRouter.get('/api/releases/:release_id', getRelease);


releaseRouter.get('/api/interactors/:version/:term', getIndexInteractors);

releaseRouter.get('/api/interactions/:version/:term', getIndexInteractions);


releaseRouter.get('/api/interactors/subset/:type/:index', getInteractorsUsingTypeAndIndex);


export default releaseRouter