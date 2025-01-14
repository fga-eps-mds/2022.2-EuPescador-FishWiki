import { Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FishWiki } from '../database/entities/fishWiki';
import { connection } from '../database';
import { RequestWithUserRole } from '../Interface/fishLogInterfaces';
import { compressImage } from '../utils/images';

dayjs.extend(utc);

export default class FishController {
  createFish = async (req: RequestWithUserRole, res: Response) => {
    try {
      let extension;
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
        photo,
      } = await req.body;

      const fish = await fishWikiRepository.findOne({
        where: { scientificName },
      });

      if (!req.user?.admin && !req.user?.superAdmin) {
        return res.status(401).json({
          message: 'Você não tem permissão para criar esse registro',
        });
      }

      if (!commonName || !largeGroup || !group) {
        return res.status(418).json({
          message: 'Os campos nome, grupo e grades grupos são obrigatórios',
        });
      }
      if (photo) extension = photo.split(';')[0].split('/')[1] || null;
      if (
        photo &&
        extension !== 'jpg' &&
        extension !== 'png' &&
        extension !== 'jpeg'
      ) {
        return res.status(406).json({
          message: 'A foto deve ser enviada em formato base 64',
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
      fishWiki.maxSize = maxSize as number;
      fishWiki.maxWeight = maxWeight as number;
      fishWiki.isEndemicInfo = isEndemicInfo;
      fishWiki.isThreatenedInfo = isThreatenedInfo;
      fishWiki.isThreatened = isThreatened;
      fishWiki.hasSpawningSeasonInfo = hasSpawningSeasonInfo;
      fishWiki.hasSpawningSeason = hasSpawningSeason;
      fishWiki.wasIntroducedInfo = wasIntroducedInfo;
      fishWiki.wasIntroduced = wasIntroduced;
      fishWiki.funFact = funFact;
      fishWiki.isEndemic = isEndemic;
      fishWiki.created_at = dayjs().toDate();
      if (photo) fishWiki.photo = await compressImage(photo as string, 60);

      await fishWikiRepository.save(fishWiki);
      return res.status(200).json(fishWiki);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha no sistema ao cadastrar, tente novamente!',
      });
    }
  };

  getAllFish = async (req: RequestWithUserRole, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);
      const entries = Object.entries(req.query);
      const count = req.query?.count !== undefined ? +req.query.count : 0;
      const page = req.query?.page !== undefined ? +req.query.page : 1;
      const mobile = !!(
        req.query?.mobile !== undefined && req.query?.mobile !== 'false'
      );
      let totalPages = 1;

      const nonEmptyOrNull = entries.filter(
        ([field, val]) =>
          val !== null && val !== '' && field !== null && field !== 'mobile'
      );

      if (
        nonEmptyOrNull &&
        (nonEmptyOrNull.length === 0 || req.query?.count !== undefined)
      ) {
        const allFishWiki = await fishWikiRepository
          .createQueryBuilder('fishWiki')
          .select()
          .orderBy('fishWiki.created_at', 'DESC')
          .skip((page - 1) * count)
          .take(count)
          .getMany();

        const quantityOfUsers = await fishWikiRepository
          .createQueryBuilder('fishWiki')
          .getCount();
        totalPages = count === 0 ? 1 : Math.ceil(quantityOfUsers / count);

        if (mobile)
          // eslint-disable-next-line no-restricted-syntax
          for (const data of allFishWiki) {
            if (data.photo !== null)
              // eslint-disable-next-line no-await-in-loop
              data.photo = await compressImage(data.photo as string, 20);
          }

        return res.status(200).json({ allFishWiki, page, count, totalPages });
      }

      const query = Object.fromEntries(nonEmptyOrNull);

      const allFilteredFishWiki = await fishWikiRepository.find({
        where: query,
      });

      if (mobile)
        // eslint-disable-next-line no-restricted-syntax
        for (const data of allFilteredFishWiki) {
          if (data.photo !== null)
            // eslint-disable-next-line no-await-in-loop
            data.photo = await compressImage(data.photo as string, 20);
        }

      return res.status(200).json(allFilteredFishWiki);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getOneFishWiki = async (req: RequestWithUserRole, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);
      const fishId = req.params.id;
      const mobile = !!(
        req.query?.mobile !== undefined && req.query?.mobile !== 'false'
      );
      const fishWiki = await fishWikiRepository.findOne({
        where: { id: fishId },
      });

      if (!fishWiki) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
      }

      if (mobile && fishWiki.photo !== null)
        fishWiki.photo = await compressImage(fishWiki.photo as string, 20);

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
      let extension;
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

      if (req.body.photo)
        extension = req.body.photo.split(';')[0].split('/')[1] || null;
      if (
        req.body.photo &&
        extension !== 'jpg' &&
        extension !== 'png' &&
        extension !== 'jpeg'
      ) {
        return res.status(406).json({
          message: 'A foto deve ser enviada em formato base 64',
        });
      }

      if (!fishWiki) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
      }

      if (req.body.photo)
        fishWiki.photo = await compressImage(req.body.photo as string, 60);

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
