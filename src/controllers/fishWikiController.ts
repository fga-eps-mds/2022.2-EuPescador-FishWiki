import { Response } from 'express';
import { createWriteStream } from 'fs';
import bl from 'bl';
import { get } from 'https';
import sharp from 'sharp';
import { FishWiki } from '../database/entities/fishWiki';
import { connection } from '../database';
import { RequestWithUserRole } from '../Interface/fishLogInterfaces';

export default class FishController {
  createFish = async (req: RequestWithUserRole, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);
      const {
        scientificName,
        largeGroup,
        group,
        family,
        commonName,
        food,
        habitat,
        maxSize,
        maxWeight,
        isEndemicInfo,
        isThreatenedInfo,
        isThreatened,
        hasSpawningSeasonInfo,
        hasSpawningSeason,
        wasIntroducedInfo,
        wasIntroduced,
        funFact,
        isEndemic,
      } = await req.body;

      const fish = await fishWikiRepository.findOne({
        where: { scientificName },
      });

      if (!req.user?.admin && !req.user?.superAdmin) {
        return res.status(401).json({
          message: 'Você não tem permissão para criar esse registro',
        });
      }

      if (fish) {
        return res.status(409).json({
          message: 'Essa espécie de peixe já foi cadastrada',
        });
      }

      const fishWiki = new FishWiki();
      fishWiki.scientificName = scientificName;
      fishWiki.largeGroup = largeGroup;
      fishWiki.group = group;
      fishWiki.family = family;
      fishWiki.commonName = commonName;
      fishWiki.food = food;
      fishWiki.habitat = habitat;
      fishWiki.maxSize = maxSize;
      fishWiki.maxWeight = maxWeight;
      fishWiki.isEndemicInfo = isEndemicInfo;
      fishWiki.isThreatenedInfo = isThreatenedInfo;
      fishWiki.isThreatened = isThreatened;
      fishWiki.hasSpawningSeasonInfo = hasSpawningSeasonInfo;
      fishWiki.hasSpawningSeason = hasSpawningSeason;
      fishWiki.wasIntroducedInfo = wasIntroducedInfo;
      fishWiki.wasIntroduced = wasIntroduced;
      fishWiki.funFact = funFact;
      fishWiki.isEndemic = isEndemic;

      await fishWikiRepository.save(fishWiki);

      return res.status(200).json(fishWiki);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha no sistema ao cadastrar, tente novamente!',
      });
    }
  };

  downloadImage = async (url: string, filepath: string) => {
    await get(url, async (res) => {
      res.pipe(createWriteStream(filepath));
      
      res.on("end", async function() {
        const cachorro = await sharp(filepath)
            .jpeg({ quality: 10, mozjpeg: true })
            .toBuffer();

        console.log(cachorro)
      });
    });
  }

  getAllFish = async (req: RequestWithUserRole, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);
      const allFishWiki = await fishWikiRepository.find();

      allFishWiki.forEach(async (data) => {
        if (data.photo !== null) {
          const cachorro = await sharp(`./src/public/images/${data.id}.jpg`)
          .jpeg({ quality: 25, mozjpeg: true })
          .toFile(`./src/public/imagesOut/${data.id}.jpg`);

          console.log(cachorro)
        }
      });

      res.status(200);
    } catch (err) {
      console.log(err);
    }
  };

  getOneFishWiki = async (req: RequestWithUserRole, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);
      const fishId = req.params.id;
      const fishWiki = await fishWikiRepository.findOne({
        where: { id: fishId },
      });

      if (!fishWiki) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
      }
      return res.status(200).json(fishWiki);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  deleteFish = async (req: RequestWithUserRole, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);
      const fishId = req.params.id;
      const fish = await fishWikiRepository.findOne({
        where: { id: fishId },
      });

      if (!req.user?.admin && !req.user?.superAdmin) {
        return res.status(401).json({
          message: 'Você não tem permissão para deletar esse registro',
        });
      }

      if (!fish) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
      }

      await fishWikiRepository
        .createQueryBuilder('fishWiki')
        .delete()
        .where('id = :id', { id: fishId })
        .execute();

      return res.status(200).json({ message: 'Peixe deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  updateFish = async (req: RequestWithUserRole, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);
      const fishId = req.params.id;
      const fishWiki = await fishWikiRepository.findOne({
        where: { id: fishId },
      });

      if (!req.user?.admin && !req.user?.superAdmin) {
        return res.status(401).json({
          message: 'Você não tem permissão para atualizar esse registro',
        });
      }

      if (!fishWiki) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
      }

      await fishWikiRepository
        .createQueryBuilder('fishWiki')
        .update()
        .set({ ...req.body })
        .where('id = :id', { id: fishId })
        .execute();

      return res.status(200).json({ ...fishWiki, ...req.body });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
