import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "./service.service.js";

// CREATE
export const create = async (req, res) => {
  try {
    const service = await createService(req.body);

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL
export const getAll = async (req, res) => {
  try {
    const services = await getAllServices();

    res.json(services);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// GET ONE
export const getOne = async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);

    res.json(service);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const service = await updateService(
      req.params.id,
      req.body
    );

    res.json(service);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteService(req.params.id);

    res.json({
      message: "Service deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};