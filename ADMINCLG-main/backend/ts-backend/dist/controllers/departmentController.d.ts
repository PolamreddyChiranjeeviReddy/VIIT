import { Request, Response } from "express";
export declare const getDepartment: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDepartmentByCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDepartmentByCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=departmentController.d.ts.map