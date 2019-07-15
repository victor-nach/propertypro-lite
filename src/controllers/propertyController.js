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

  /**
   * @static updatePrice
   * @param { Object } req
   * @param { Object } res
   * @returns response object
   * @description handles requests for creation of a new propeties
   * @memberof PropertyController
   */
  static async updatePrice(req, res) {
    const { price } = req.body;
    const { user_id } = req.user;
    const { id } = req.params;
    try {
      await Property.checkEditProperty(id, user_id);
      const property = await Property.editPrice(id, price);
      return response(res, 200, property);
    } catch (error) {
      if (error.name === 'property_null') {
        return responseErr(res, 404, 'Invalid property id, no matches found');
      }
      if (error.name === 'unauthorized') {
        return responseErr(res, 401, 'You do not own the property you are trying to update');
      }
      return responseErr(res, 500, 'server error');
    }
  }

  /**
   * @static updateStatus
   * @param { Object } req
   * @param { Object } res
   * @returns response object
   * @description handles requests for updating of property request to sold
   * @memberof PropertyController
   */
  static async updateStatus(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;
    try {
      await Property.checkEditProperty(id, user_id);
      const property = await Property.editStatus(id);
      return response(res, 200, property);
    } catch (error) {
      if (error.name === 'property_null') {
        return responseErr(res, 404, 'Invalid property id, no matches found');
      }
      if (error.name === 'unauthorized') {
        return responseErr(res, 401, 'You do not own the property you are trying to update');
      }
      return responseErr(res, 500, 'server error');
    }
  }
}

export default PropertyController;
