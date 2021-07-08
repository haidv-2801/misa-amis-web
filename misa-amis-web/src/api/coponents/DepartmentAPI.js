import BaseAPI from '../base/BaseAPI';
import BaseAPIConfig from '../base/BaseAPIConfig';

class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = '/v1/Departments';
  }
}

export default new EmployeeAPI();
