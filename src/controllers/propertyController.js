import Property from '../models/methods/property';
import ResponseMsg from '../utils/responseMsg';
// import { dataUri } from '../middleware/multer';
// import { uploader } from '../config/cloudinary.config';

const { response, responseErr } = ResponseMsg;

class PropertyController {
  /**
   * @static createProperty
   * @param { Object } req
   * @param { Object } res
   * @returns response object
   * @description handles requests for creation of a new propeties
   * @memberof PropertyController
   */
  static async createProperty(req, res) {
    const {
      price, state, city, address, type, image_url,
    } = req.body;
    const { user_id } = req.user;
    try {
      // ---- get image url from cloudinary directly instead of uplading it ---
      // let image_url;
      // const file = dataUri(req).content;
      // const fileUpload = await uploader.upload(file, { folder: 'image/' });
      // if (fileUpload) image_url = fileUpload.url;
      // if (image_url === undefined) return responseErr(res, 400, 'not working');

      const property = await Property
        .createProperty(user_id, price, state, city, address, type, image_url);
      return response(res, 200, property);
    } catch (error) {
      return responseErr(res, 500, 'server error');
    }
  }
}

export default PropertyController;
