import {
  getClientCalendar,
  getAdminCalendar,
} from "./calendar.service.js";

// CLIENT
export const clientCalendar = async (req, res) => {
  try {
    const data = await getClientCalendar(req.params.serviceId);

    return res.json({
      message: "Client calendar fetched",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// ADMIN
export const adminCalendar = async (req, res) => {
  try {
    const data = await getAdminCalendar(req.params.serviceId);

    return res.json({
      message: "Admin calendar fetched",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};