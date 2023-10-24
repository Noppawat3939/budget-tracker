import { IFExpenseData, IFIncomeData } from "@/types";

export type PutEditBudgetRequest = {
  idToken: string;
  body: {
    income?: IFIncomeData;
    expense?: IFExpenseData;
  };
};

export type PutEditBudgetResponse = {
  message: string;
  data: IFExpenseData | IFIncomeData;
};
