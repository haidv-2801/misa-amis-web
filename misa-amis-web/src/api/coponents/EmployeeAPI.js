import BaseAPI from "../base/BaseAPI";
import BaseAPIConfig from "../base/BaseAPIConfig";

class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "/v1/Employees";
  }

  /**
   * Lấy mã nhân viên mới
   * DVHAI 07/07/2021
   */
  getNextEmployeeCode() {
    let urlFull = this.controler + "/NextEmployeeCode";
    return BaseAPIConfig.get(urlFull);
  }

  /**
   * Lọc
   * DVHAI 07/07/2021
   */
  filter(pageSize, pageNumber, employeeFilter) {
    let urlFull =
      this.controler +
      `/employeeFilter?pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${employeeFilter}`;
    return BaseAPIConfig.get(urlFull);
  }

  /**
   * Lấy nhân viên theo mã nhân viên
   * DVHAI 07/07/2021
   */
  getEmployeeBycode(employeeCode) {
    let urlFull = `${this.controler}/EmployeeByCode/${employeeCode}`;
    return BaseAPIConfig.get(urlFull);
  }
}

export default new EmployeeAPI();
