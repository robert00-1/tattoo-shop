import { generateWeeklySlots } from "./admin.service.js";

export const generateSlots = async (req, res) => {
  try {
    const results = await generateWeeklySlots(); 

    res.json({
      message: "Weekly slots generated",
      results,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};