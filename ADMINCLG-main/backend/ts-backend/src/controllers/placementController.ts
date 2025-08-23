import { Request, Response } from 'express';
import Placement from '../models/placementModel';


export const createPlacement = async (req: Request, res: Response) => {
  try {
    const { student, company, package: pkg } = req.body;

    // const image = req.files && (req.files as any).image ? (req.files as any).image[0].filename : '';
    // const companyLogo = req.files && (req.files as any).companyLogo ? (req.files as any).companyLogo[0].filename : '';
    // console.log(req.files)
    const image = req.files?.image?.[0]?.buffer;
    const companyLogo  = req.files?.companyLogo?.[0]?.buffer;
    if (!image || !companyLogo) {
      return res.status(400).json({ error: 'image, companyLogo are required' });
    }

    const newPlacement = await Placement.create({
      student,
      company,
      package: pkg,
      image,
      companyLogo,
    });

    res.status(201).json(newPlacement);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllPlacements = async (_req: Request, res: Response) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    if (!placements || placements.length === 0) {
      return res.status(404).json({ error: "Placements not found" });
    }
    const formatted = placements.map((placement) => ({
      _id: placement._id,
      student: placement.student,
      company: placement.company,
      package: placement.package,
      image: `data:${placement.contentType};base64,${placement.image.toString("base64")}`,
      companyLogo: `data:${placement.contentType};base64,${placement.companyLogo.toString("base64")}`,
    }));

    return res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { student, company, package: pkg } = req.body;
    // console.log(req.files);

    // const image = req.files?.image?.[0]?.buffer;
    // const companyLogo  = req.files?.companyLogo?.[0]?.buffer;

    const placement = await Placement.findById(_id);
    if (!placement) {
      return res.status(404).json({ error: 'Placement not found' });
    }

    // Update text fields
    placement.student = student || placement.student;
    placement.company = company || placement.company;
    placement.package = pkg || placement.package;
    // placement.image = image || placement.image;
    // placement.companyLogo = companyLogo || placement.companyLogo; 
    // Replace image if uploaded
    // Replace desktop image
    if(req.files?.heroImage?.[0]){
    placement.image = req.files.image[0].buffer;
    }
    if(req.files?.companyLogo?.[0]){
    placement.companyLogo = req.files.companyLogo[0].buffer;
    }


    const updatedPlacement = await placement.save();
    return res.status(200).json(updatedPlacement);
  } catch (err:any) {
    return res.status(500).json({ error: err });
  }
};


export const deletePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const placement = await Placement.findByIdAndDelete(_id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    res.status(200).json({ message: 'Placement deleted successfully' });
  } catch (err:unknown) {
    res.status(500).json({ error: err });
  }
};
