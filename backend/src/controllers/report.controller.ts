import { Request, Response } from 'express';
import { ReportService } from '../services';
import { validateReportInput } from '../middleware/validation';

export const ReportController = {
  createReport: [
    validateReportInput,
    async (req: Request, res: Response) => {
      try {
        const report = await ReportService.createReport(
          req.user.id,
          req.files as Express.Multer.File[],
          req.body
        );
        res.status(201).json(report);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  ],

  getReports: async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const reports = await ReportService.getPaginatedReports(
        Number(page),
        Number(limit)
      );
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  }
};
