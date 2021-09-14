import { getRepository } from "typeorm";
import {Request, Response} from "express";
import { Release } from "../entities/Release.js";


import {Component} from "../entities/Component.js";
import {Interaction} from "../entities/Interaction.js";
import {Interactor} from "../entities/Interactor.js";


export const getReleases = async (req: Request, res: Response) : Promise <Response> => {
  const releases  = await getRepository(Release).find()
  return res.json(releases);
} 

export const getRelease = async (req: Request, res: Response) : Promise <Response> => {
  const release  = await getRepository(Release).findOne(req.params.release_id)

  return res.json(release);
} 

export const getIndexInteractors = async (req: Request, res: Response) : Promise <Response> => {

  const result  = await getRepository(Interactor)
                   .createQueryBuilder("interactor")
                   .innerJoinAndSelect("interactor.interaction","interaction")
                   .innerJoinAndSelect("interaction.component","component")
                   .select(['interactor.interactor_id'])
                   .where("interactor.official_symbol = :term" ).setParameters({ term: req.params.term})
                   .andWhere("component.release_fk = :version" ).setParameters({ version: req.params.version}).getMany();
  
  return res.json(result);
} 


export const getIndexInteractions = async (req: Request, res: Response) : Promise <Response> => {

  const result  = await getRepository(Interaction)
                   .createQueryBuilder("interaction")
                   .innerJoinAndSelect("interaction.component","component")
                   .innerJoinAndSelect("interaction.interactors","interactor")
                   .select(['interaction.interaction_id'])
                   .where("interactor.official_symbol = :term" ).setParameters({ term: req.params.term})
                   .andWhere("component.release_fk = :version" ).setParameters({ version: req.params.version}).getMany();
  
  return res.json(result);
} 

export const getInteractorsUsingTypeAndIndex = async (req: Request, res: Response) : Promise <Response> => {

  const result  = await getRepository(Interactor)
                   .createQueryBuilder("interactor")
                   .where("interactor.interaction_fk = :index" ).setParameters({ index: req.params.index})
                   .andWhere("interactor.type = :type" ).setParameters({ type: req.params.type}).getMany();
  
  return res.json(result);
} 

