export type GetBudgetTimestampRequest = {
  idToken: string;
};

export type GetBudgetTimestampResponse = {
  message: string;
  data: Date[];
};
