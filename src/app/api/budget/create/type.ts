export type CreateBudgetRequest = {
  income: {
    income: string;
    description?: string;
    value: number;
  };
  // expense: {
  //   expense: string;
  //   description?: string;
  //   value: number;
  // };
};
