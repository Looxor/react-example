import ModelBase from "../../_CommonModels/ModelBase";

class Partner extends ModelBase {
  partner_id: string = '';
  partner_name: string = '';

  constructor(partner_id, partner_name) {
    super({});
    this.partner_id = partner_id;
    this.partner_name = partner_name;
  }
}

export default Partner;
