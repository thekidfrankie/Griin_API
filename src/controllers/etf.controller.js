import { Etf } from "../models/Etf.model.js";

// id PK
// name: string
// administrator: string
// nemo: string
// url: int
// value_type: string
// financial_instrument: string

export const createEtf = async (req, res) => {
  try {
    const { name, administrator, nemo, url, value_type, financial_instrument } = req.body;

    const existingEtf = await Etf.findOne({ where: { nemo: nemo } });
    if (existingEtf) {
      return res.status(411).json({ message: "the Rtf is alredy created" });
    }
    let newEtf = await Etf.create(
      {
        name: name,
        administrator: administrator,
        nemo: nemo,
        url: url,
        value_type: value_type,
        financial_instrument: financial_instrument
      },
      {
        fields: ["name", "administrator", "nemo", "renurltability", "value_type", "financial_instrument"],
      }
    );
    res.json(newEtf);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const UpdateEtf = async (req, res) => {
    try {
      const { id } = req.params;
      const {  name, administrator, nemo, url, value_type, financial_instrument } = req.body;
  
      const result = await Etf.findByPk(id);
      result.name = name;
      result.administrator = administrator;
      result.nemo = nemo;
      result.url = url;
      result.value_type = value_type;
      result.financial_instrument = financial_instrument;
      await result.save();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteEtf = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Etf.destroy({
      where: {
        userId: id,
      },
    });
    console.log(result)
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
