/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '../../common/exceptions/bad-request.exception';
import { generateSlug } from '../../common/utils/slugify.util';

/**
 * @const multerOptions
 * @description Multer FileInterceptor configuration options,
 * including disk storage and custom filename logic for images.
 * This configuration is reused for image uploads in both product creation and update operations.
 *
 * @property {object} storage - Defines how and where files will be stored.
 * @property {Function} storage.destination - Function that specifies the destination folder for files.
 * @property {Function} storage.filename - Function that generates the unique filename on disk.
 * @property {Function} fileFilter - Function that filters allowed files based on their mimetype or extension.
 *
 * @author [Uedney C Morais] <uedneymorais@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const productName: string | undefined = req.body.name;
      const productId: string | undefined = req.params?.id;

      let baseNameForFile: string;

      if (productName) {
        baseNameForFile = generateSlug(productName);
      } else if (productId) {
        baseNameForFile = `product-${productId}`;
      } else {
        return cb(
          new BadRequestException(
            'Nome do produto ou ID é necessário para gerar o nome do arquivo.',
          ),
          '',
        );
      }

      const fileExtension = extname(file.originalname);
      const uniqueSuffix = Date.now().toString(36);

      const newFileName = `${baseNameForFile}-${uniqueSuffix}${fileExtension}`;
      cb(null, newFileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(
        new BadRequestException(
          'Apenas arquivos de imagem (JPG, JPEG, PNG, GIF) são permitidos!',
        ),
        false,
      );
    }
    cb(null, true);
  },
};
