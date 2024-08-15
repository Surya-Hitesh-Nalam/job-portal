import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyname } = req.body;
    if (!companyname) {
      res.status(400).json({
        message: "provide an company name",
        status: false,
      });
    }
    let company = await Company.findOne({ name: companyname });
    if (company) {
      res.status(400).json({
        message: "you cant register the same company",
        status: false,
      });
    }
    company = await Company.create({
      name: companyname,
      userId: req.id,
    });
    return res.status(201).json({
      message: "company created successfully",
      company,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      res.status(404).json({
        message: "companies not found",
        status: false,
      });
    }
    return res.status(200).json({
        companies,
        status:true
    })
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      res.status(400).json({
        message: "comapany not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company data updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
